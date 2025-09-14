# This flake builds the web app. The result only contains the generated web-
# app (no Docker image or so).

{
  description = "Wambo Web (Web App)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs =
    inputs@{ self, nixpkgs }:
    let
      systems = inputs.nixpkgs.lib.systems.flakeExposed;

      # Generates the typical per-system flake attributes.
      forAllSystems =
        function:
        inputs.nixpkgs.lib.genAttrs systems (system: function inputs.nixpkgs.legacyPackages.${system});

      project = pkgs: pkgs.callPackage ./nix/release.nix { };
    in
    {
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell {
          default = pkgs.mkShell {
            inputsFrom = [ (project pkgs) ];
          };
        };
      });
      formatter = forAllSystems (pkgs: pkgs.nixfmt-tree);
      # $ nix build .\#<attribute-name>
      packages = forAllSystems (pkgs: {
        default = (project pkgs);
      });
    };
}

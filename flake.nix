# This flake builds the web app. The result only contains the generated web-
# app (no Docker image or so).

{
  description = "Wambo Web (Web App)";

  inputs = {
    gitignore.url = "github:hercules-ci/gitignore.nix";
    gitignore.inputs.nixpkgs.follows = "nixpkgs";

    nixpkgs.url = "github:NixOS/nixpkgs/release-23.11";

    flake-parts.url = "github:hercules-ci/flake-parts";
    flake-parts.inputs.nixpkgs-lib.follows = "nixpkgs";
  };

  outputs = inputs@{ self, nixpkgs, gitignore, flake-parts }:
    flake-parts.lib.mkFlake { inherit inputs; }
      {
        flake = { };

        # This can be build on all systems.
        systems = nixpkgs.lib.systems.flakeExposed;

        perSystem = { config, pkgs, ... }:
          let
            project = import ./default.nix {
              inherit pkgs;
              gitignoreSource = gitignore.lib.gitignoreSource;
            };
          in
          {
            devShells = {
              default = pkgs.mkShell {
                inputsFrom = [
                  project
                ];

                shellHook = ''
                    '';
              };
            };

            formatter = pkgs.nixpkgs-fmt;

            # $ nix build .\#<attribute-name>
            packages = {
              default = project;
            };
          };
      };
}

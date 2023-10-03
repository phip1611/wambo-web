# This flake builds the web app. The result only contains the generated web-
# app (no Docker image or so).

{
  description = "Wambo Web (Web App)";

  inputs = {

    gitignore = {
      url = "github:hercules-ci/gitignore.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    nixpkgs.url = "github:NixOS/nixpkgs/release-23.05";
  };

  outputs = { self, nixpkgs, gitignore }:
    let
      inherit (gitignore.lib) gitignoreSource;
    in
    {
      # TODO build for every architecture/system
      packages.x86_64-linux.default =
        let
          pkgs = import nixpkgs { system = "x86_64-linux"; };
        in
        pkgs.callPackage ./default.nix { inherit gitignoreSource; };
    };
}

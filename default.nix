{ pkgs
, gitignoreSource
}:

pkgs.callPackage ./nix/release.nix { inherit gitignoreSource; }

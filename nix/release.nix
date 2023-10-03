{ pkgs, gitignoreSource }:

pkgs.buildNpmPackage {
  pname = "wambo-web";
  version = "0.0.0";

  src = gitignoreSource ../.;

  npmDepsHash = "sha256-3ycucT3Lai6CmL1O3W6pbnnoBTa6+bZdcbQCgt+5v6s=";

  npmBuildScript = "build_prod";

  installPhase = ''
    runHook preInstall

    mkdir -p $out/
    mv dist $out/share

    runHook postInstall
    '';
}

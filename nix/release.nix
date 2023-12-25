{ pkgs, gitignoreSource }:

pkgs.buildNpmPackage {
  pname = "wambo-web";
  version = "0.0.0";

  src = gitignoreSource ../.;

  npmDepsHash = "sha256-nDhMr3eRxnxXZT5g0xPYUkDZVeV7Wno2M6Nyv9H0fzg=";

  npmBuildScript = "build_prod";

  installPhase = ''
    runHook preInstall

    mkdir -p $out/
    mv dist $out/share

    runHook postInstall
  '';
}

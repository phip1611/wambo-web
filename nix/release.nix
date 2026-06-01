{
  # Helper
  buildNpmPackage,
  nix-gitignore,
  # Packages
  brotli,
  fd,
  nodejs_24,
  ouch,
}:

buildNpmPackage {
  pname = "wambo-web";
  version = "0.0.0";

  src = nix-gitignore.gitignoreSource [ ] ../.;

  nodejs = nodejs_24;

  nativeBuildInputs = [
    brotli
    fd # better find
    ouch
  ];

  /*
    # Needed for the unit tests.
    CHROME_BIN = "${pkgs.ungoogled-chromium}/bin/chromium";

    doCheck = true;
    checkPhase = ''
      npm test
    '';
  */

  npmDepsHash = "sha256-Uc755U5Su9qCXZ0zPX7TbyO8muhNW26XgNnRGaVpCek=";

  npmBuildScript = "build_prod";

  installPhase = ''
    runHook preInstall

    mkdir -p $out/
    mv dist $out/share

    runHook postInstall
  '';
}

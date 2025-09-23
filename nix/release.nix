{
  buildNpmPackage,
  nodejs_22,
  fd,
  ouch,
  brotli,
  nix-gitignore,
}:

buildNpmPackage {
  pname = "wambo-web";
  version = "0.0.0";

  src = nix-gitignore.gitignoreSource [ ] ../.;

  nodejs = nodejs_22;

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

  npmDepsHash = "sha256-0Sq93D+vKZmTBsCoWUK2ZKfxRuP3GJrp1GkFtB9xp0A=";

  npmBuildScript = "build_prod";

  installPhase = ''
    runHook preInstall

    mkdir -p $out/
    mv dist $out/share

    runHook postInstall
  '';
}

{
  buildNpmPackage,
  nodejs_24,
  fd,
  ouch,
  brotli,
  nix-gitignore,
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

  npmDepsHash = "sha256-3XoUphLUjsYh/G+DqM//g85/3hYnhM7S2BBwas6qTFY=";

  npmBuildScript = "build_prod";

  installPhase = ''
    runHook preInstall

    mkdir -p $out/
    mv dist $out/share

    runHook postInstall
  '';
}

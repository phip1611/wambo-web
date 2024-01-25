{ pkgs, gitignoreSource }:

pkgs.buildNpmPackage {
  pname = "wambo-web";
  version = "0.0.0";

  src = gitignoreSource ../.;

  nodejs = pkgs.nodejs_20;

  nativeBuildInputs = with pkgs; [
    fd # better find
    ouch
    brotli
  ];

  /*
  # Needed for the unit tests.
  CHROME_BIN = "${pkgs.ungoogled-chromium}/bin/chromium";

  doCheck = true;
  checkPhase = ''
    npm test
  '';
  */

  npmDepsHash = "sha256-kNtA1SM/7xdKHRczk+Ky6LSssbICtbnFS09q7LXBlso=";

  npmBuildScript = "build_prod";

  installPhase = ''
    runHook preInstall

    mkdir -p $out/
    mv dist $out/share

    runHook postInstall
  '';
}

{ pkgs }: {
	deps = [
    pkgs.nodejs-18_x
    pkgs.yarn
		pkgs.nodePackages.npm
    pkgs.nodePackages.typescript-language-server
	];
}
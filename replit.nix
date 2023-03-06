{ pkgs }: {
	deps = [
    pkgs.nodejs-17_x
		pkgs.cowsay
		pkgs.unzip
		pkgs.vim
    pkgs.yarn
		pkgs.nodePackages.npm
    pkgs.nodePackages.typescript-language-server
	];
}
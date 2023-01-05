{ pkgs }: {
	deps = [
		pkgs.vim
  pkgs.openssh_with_kerberos
  pkgs.nodejs-16_x
        pkgs.nodePackages.typescript-language-server
        pkgs.yarn
        pkgs.replitPackages.jest
	];
}
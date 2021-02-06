set -e
echo "Make sure that you have installed the following tools:"
echo "  nodeJS"
which node
echo "  yarn (classic)"
which yarn
echo "  docker"
which docker

yarn install
yarn run build_prod

set -e
echo "Make sure that you have installed the following tools:"
echo "  nodeJS"
which node
echo "  npm"
which npm
echo "  docker"
which docker

npm install
npm run build_prod

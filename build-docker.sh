set -e
echo "Make sure that you have installed the following tools:"
echo "  docker"
which docker

sh build.sh
docker build -t phip1611/wambo-web .

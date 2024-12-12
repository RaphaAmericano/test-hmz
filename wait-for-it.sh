#!/usr/bin/env bash

# wait-for-it.sh: Wait for a service to be available before continuing.

# The script waits until the service at the given host:port is available.
# The options are:
#   --timeout <seconds>: Timeout after the specified number of seconds (default 15 seconds)
#   --strict: Fail if the service is not available
#   --host <hostname>: Host to check (default "localhost")
#   --port <port>: Port to check (default 3306)

TIMEOUT=15
STRICT=0
HOST=localhost
PORT=3306

usage() {
  echo "Usage: $0 [OPTIONS] <host>:<port>"
  echo "Wait for a service to be available before continuing."
  echo "Options:"
  echo "  --timeout <seconds>  Timeout after the specified number of seconds (default 15)"
  echo "  --strict             Fail if the service is not available"
  echo "  --host <hostname>    Host to check (default localhost)"
  echo "  --port <port>        Port to check (default 3306)"
  exit 1
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --timeout)
      TIMEOUT=$2
      shift 2
      ;;
    --strict)
      STRICT=1
      shift
      ;;
    --host)
      HOST=$2
      shift 2
      ;;
    --port)
      PORT=$2
      shift 2
      ;;
    *)
      HOST=$1
      PORT=$2
      shift 2
      ;;
  esac
done

# Loop until the service is available
echo "Waiting for $HOST:$PORT to be available..."

until nc -z -v -w30 $HOST $PORT
do
  echo "$HOST:$PORT is unavailable - sleeping"
  sleep 1
done

echo "$HOST:$PORT is available - continuing"

exit 0

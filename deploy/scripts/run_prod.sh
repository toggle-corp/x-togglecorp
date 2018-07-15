#! /bin/bash

BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )" # /code/deploy/scripts/
ROOT_DIR=$(dirname "$(dirname "$BASE_DIR")") # /code/

. /venv/bin/activate

python3 $ROOT_DIR/manage.py collectstatic --no-input
python3 $ROOT_DIR/manage.py migrate --no-input

uwsgi --ini $ROOT_DIR/deploy/configs/uwsgi.ini # Start uwsgi server

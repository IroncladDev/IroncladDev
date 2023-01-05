#! /bin/bash

id="acb818b6-e453-4e86-bb41-2be5330bfb9b"

if [ "$REPL_ID" = "$id" ]; then
  echo "Booted Successfully"
else
  rm -rf /home/runner/$REPL_SLUG/*
fi
#!/bin/sh
rm -rf backend/public/*
sencha app build production
cp -R frontend/build/production/DL/ backend/public/
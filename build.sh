#!/bin/sh
rm -rf backend/public/*
cd frontend
sencha app build production
cp -R ./build/production/DL/ ../backend/public/
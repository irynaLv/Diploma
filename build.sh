#!/bin/sh
# Run the unit tests in this test bundle.
xcodebuild -sdk iphonesimulator -configuration Debug -target DatabaseClientTests TEST_AFTER_BUILD=YES clean build > test_log.txt
python hfcca15.py --warnings_only --CCN=10 --working_threads=4 DatabaseClient > ccn_log.txt
cd build/DatabaseClient.build/Debug-iphonesimulator/DatabaseClientTests.build
rm ./Objects-normal/i386/*Tests*
lcov -q -c -d "Objects-normal/i386" -o coverage.info --rc lcov_branch_coverage=1
genhtml coverage.info -q -o cov --rc lcov_branch_coverage=1
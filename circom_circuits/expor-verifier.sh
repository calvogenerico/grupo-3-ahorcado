#!/usr/bin/env bash

set -e

HERE=$(dirname "$(realpath "$0")");

mkdir -p $HERE/target
rm -rf $HERE/target/*

# Compile
circom $HERE/circuits/main.circom --sym --r1cs --O2 -l $HERE/node_modules --output="$HERE/target"
# Get perpetual power of taus file
mkdir -p $HERE/ptaus
if [ ! -f "$HERE/ptaus/ppot_10.ptau"  ]; then
  echo "Downloading ptau file..."
  wget -O $HERE/ptaus/ppot_10.ptau https://pse-trusted-setup-ppot.s3.eu-central-1.amazonaws.com/pot28_0080/ppot_0080_10.ptau
fi

# Generate zkey
pnpm snarkjs g16s "$HERE/target/main.r1cs" "$HERE/ptaus/ppot_10.ptau" "$HERE/target/main_0000.zkey"

# Generate entropy
ENTROPY=`head -c 16 /dev/urandom | xxd -p`
# Contribute
pnpm snarkjs zkc "$HERE/target/main_0000.zkey" "$HERE/target/main_0001.zkey" --entropy="$ENTROPY" --name="anyone"

# Export solidity verifier
pnpm snarkjs zkesv "$HERE/target/main_0001.zkey" "$HERE/../contracts/src/CircomVerifier.sol"


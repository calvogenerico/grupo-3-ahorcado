// SPDX-License-Identifier: GPL-3.0
/*
    Copyright 2021 0KIMS association.

    This file is generated with [snarkJS](https://github.com/iden3/snarkjs).

    snarkJS is a free software: you can redistribute it and/or modify it
    under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    snarkJS is distributed in the hope that it will be useful, but WITHOUT
    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
    or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
    License for more details.

    You should have received a copy of the GNU General Public License
    along with snarkJS. If not, see <https://www.gnu.org/licenses/>.
*/

pragma solidity >=0.7.0 <0.9.0;

contract Groth16Verifier {
    // Scalar field size
    uint256 constant r    = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
    // Base field size
    uint256 constant q   = 21888242871839275222246405745257275088696311157297823662689037894645226208583;

    // Verification Key data
    uint256 constant alphax  = 16428432848801857252194528405604668803277877773566238944394625302971855135431;
    uint256 constant alphay  = 16846502678714586896801519656441059708016666274385668027902869494772365009666;
    uint256 constant betax1  = 3182164110458002340215786955198810119980427837186618912744689678939861918171;
    uint256 constant betax2  = 16348171800823588416173124589066524623406261996681292662100840445103873053252;
    uint256 constant betay1  = 4920802715848186258981584729175884379674325733638798907835771393452862684714;
    uint256 constant betay2  = 19687132236965066906216944365591810874384658708175106803089633851114028275753;
    uint256 constant gammax1 = 11559732032986387107991004021392285783925812861821192530917403151452391805634;
    uint256 constant gammax2 = 10857046999023057135944570762232829481370756359578518086990519993285655852781;
    uint256 constant gammay1 = 4082367875863433681332203403145435568316851327593401208105741076214120093531;
    uint256 constant gammay2 = 8495653923123431417604973247489272438418190587263600148770280649306958101930;
    uint256 constant deltax1 = 5805947493537984515991772159036344030553596298551150958635838385297953324073;
    uint256 constant deltax2 = 14669766792971033491534631286504533073651694713935275193190921865640676047293;
    uint256 constant deltay1 = 19874841080892698792216337801501934967238650670522416937692524845579727055662;
    uint256 constant deltay2 = 17798635487715596824523110820225258626979744618909125666530640773663507910619;

    
    uint256 constant IC0x = 483402791391992275011128001794384148689442799716743604882533739948831178480;
    uint256 constant IC0y = 3993812358447693111215132491788348628076090462158120008226492586737098096542;
    
    uint256 constant IC1x = 13912893777221376292857813921741967181999716367805998487564295205057682783618;
    uint256 constant IC1y = 9908193191503156298519635335190010156375103740073211652113840672282203502166;
    
    uint256 constant IC2x = 10984329398041669480532474885358396128018185686195122886896714851598556351714;
    uint256 constant IC2y = 14138891875490434564749118767592400089205586195664580105651591515727634439745;
    
    uint256 constant IC3x = 4255074958290470886560859226246779610336496222967361841054264766716300065135;
    uint256 constant IC3y = 9615176284432277746992591429641181907633196528457126011205548851419434339458;
    
    uint256 constant IC4x = 15554861977008040677061259163419210644147643560212419567023090512978590548353;
    uint256 constant IC4y = 6869518182664823433643101251522968179546975365126140521328953077677525240090;
    
    uint256 constant IC5x = 20580853606738293792099676615939580683835825358227549808397004064885195020246;
    uint256 constant IC5y = 8581694681476180350111009222442420739914834912524226562540148586409224806487;
    
    uint256 constant IC6x = 21600516951603191082897814464173757600666498082952974858983135241891036453992;
    uint256 constant IC6y = 17642341111100525851949427319249446904018940900424929437418804007971016368702;
    
    uint256 constant IC7x = 19582796583583174442528988830403688000788545948390923599234801922444684056013;
    uint256 constant IC7y = 12800161034647050847259966349329603860968609155843659235566519932443879341488;
    
    uint256 constant IC8x = 5684617394008606301138668448980897969260516338179757818515090606579935075462;
    uint256 constant IC8y = 4843880831200637289060960909366877536607474925391776575975101603097913324960;
    
    uint256 constant IC9x = 2162053918752242028896999377403375672469878415084928045688369926356581768412;
    uint256 constant IC9y = 2913605985642080466697180931952647930616502012492737742616326761521745007098;
    
    uint256 constant IC10x = 13535877347650956336356015146259976549068979025662075923897894241530538053533;
    uint256 constant IC10y = 6172527333010339701213083294946757431815899113162392957143792513372947733871;
    
    uint256 constant IC11x = 155395526794875963823802815272689280493277918891408093451366933179716647949;
    uint256 constant IC11y = 7141107865652242122902756978327514510858946465697711028429143225811792915190;
    
    uint256 constant IC12x = 8399679493896540068453938347760653555609630881843572528164113044619103366837;
    uint256 constant IC12y = 6480331201013024037597750186912817018820080796695218356017989703175352015798;
    
    uint256 constant IC13x = 245965920625214458849091268187085935373043668066555500835137493599596509890;
    uint256 constant IC13y = 21672590734313616153482539249874270615629584551875410903774268224125121523794;
    
    uint256 constant IC14x = 20593603101704569142937896496113981441062103316013244497009546766255587207316;
    uint256 constant IC14y = 16660401650218716929489210678542029487020534559024449940516157942189186614939;
    
    uint256 constant IC15x = 11294944678506787215098622611218807502363754104685249868988916821334420734276;
    uint256 constant IC15y = 4296059601300841679573507848519117585890011714191345957026242713051329635166;
    
    uint256 constant IC16x = 14071925478182923106690008326643691810408440165882119098774113207310986592619;
    uint256 constant IC16y = 8314720760355065714661770265737524491582974629440371909952468164296566172364;
    
    uint256 constant IC17x = 721219300627169972755315005944068542667054380995643575403573279573916395781;
    uint256 constant IC17y = 3508801296171317086907222093369936420308499050156180418573303025990154072181;
    
    uint256 constant IC18x = 19380209314850177985178089748138482799206190409357957198220666488537864038256;
    uint256 constant IC18y = 11285328391127922974050737349815613197010339781583559644613685416586899115633;
    
 
    // Memory data
    uint16 constant pVk = 0;
    uint16 constant pPairing = 128;

    uint16 constant pLastMem = 896;

    function verifyProof(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[18] calldata _pubSignals) public view returns (bool) {
        assembly {
            function checkField(v) {
                if iszero(lt(v, r)) {
                    mstore(0, 0)
                    return(0, 0x20)
                }
            }
            
            // G1 function to multiply a G1 value(x,y) to value in an address
            function g1_mulAccC(pR, x, y, s) {
                let success
                let mIn := mload(0x40)
                mstore(mIn, x)
                mstore(add(mIn, 32), y)
                mstore(add(mIn, 64), s)

                success := staticcall(sub(gas(), 2000), 7, mIn, 96, mIn, 64)

                if iszero(success) {
                    mstore(0, 0)
                    return(0, 0x20)
                }

                mstore(add(mIn, 64), mload(pR))
                mstore(add(mIn, 96), mload(add(pR, 32)))

                success := staticcall(sub(gas(), 2000), 6, mIn, 128, pR, 64)

                if iszero(success) {
                    mstore(0, 0)
                    return(0, 0x20)
                }
            }

            function checkPairing(pA, pB, pC, pubSignals, pMem) -> isOk {
                let _pPairing := add(pMem, pPairing)
                let _pVk := add(pMem, pVk)

                mstore(_pVk, IC0x)
                mstore(add(_pVk, 32), IC0y)

                // Compute the linear combination vk_x
                
                g1_mulAccC(_pVk, IC1x, IC1y, calldataload(add(pubSignals, 0)))
                
                g1_mulAccC(_pVk, IC2x, IC2y, calldataload(add(pubSignals, 32)))
                
                g1_mulAccC(_pVk, IC3x, IC3y, calldataload(add(pubSignals, 64)))
                
                g1_mulAccC(_pVk, IC4x, IC4y, calldataload(add(pubSignals, 96)))
                
                g1_mulAccC(_pVk, IC5x, IC5y, calldataload(add(pubSignals, 128)))
                
                g1_mulAccC(_pVk, IC6x, IC6y, calldataload(add(pubSignals, 160)))
                
                g1_mulAccC(_pVk, IC7x, IC7y, calldataload(add(pubSignals, 192)))
                
                g1_mulAccC(_pVk, IC8x, IC8y, calldataload(add(pubSignals, 224)))
                
                g1_mulAccC(_pVk, IC9x, IC9y, calldataload(add(pubSignals, 256)))
                
                g1_mulAccC(_pVk, IC10x, IC10y, calldataload(add(pubSignals, 288)))
                
                g1_mulAccC(_pVk, IC11x, IC11y, calldataload(add(pubSignals, 320)))
                
                g1_mulAccC(_pVk, IC12x, IC12y, calldataload(add(pubSignals, 352)))
                
                g1_mulAccC(_pVk, IC13x, IC13y, calldataload(add(pubSignals, 384)))
                
                g1_mulAccC(_pVk, IC14x, IC14y, calldataload(add(pubSignals, 416)))
                
                g1_mulAccC(_pVk, IC15x, IC15y, calldataload(add(pubSignals, 448)))
                
                g1_mulAccC(_pVk, IC16x, IC16y, calldataload(add(pubSignals, 480)))
                
                g1_mulAccC(_pVk, IC17x, IC17y, calldataload(add(pubSignals, 512)))
                
                g1_mulAccC(_pVk, IC18x, IC18y, calldataload(add(pubSignals, 544)))
                

                // -A
                mstore(_pPairing, calldataload(pA))
                mstore(add(_pPairing, 32), mod(sub(q, calldataload(add(pA, 32))), q))

                // B
                mstore(add(_pPairing, 64), calldataload(pB))
                mstore(add(_pPairing, 96), calldataload(add(pB, 32)))
                mstore(add(_pPairing, 128), calldataload(add(pB, 64)))
                mstore(add(_pPairing, 160), calldataload(add(pB, 96)))

                // alpha1
                mstore(add(_pPairing, 192), alphax)
                mstore(add(_pPairing, 224), alphay)

                // beta2
                mstore(add(_pPairing, 256), betax1)
                mstore(add(_pPairing, 288), betax2)
                mstore(add(_pPairing, 320), betay1)
                mstore(add(_pPairing, 352), betay2)

                // vk_x
                mstore(add(_pPairing, 384), mload(add(pMem, pVk)))
                mstore(add(_pPairing, 416), mload(add(pMem, add(pVk, 32))))


                // gamma2
                mstore(add(_pPairing, 448), gammax1)
                mstore(add(_pPairing, 480), gammax2)
                mstore(add(_pPairing, 512), gammay1)
                mstore(add(_pPairing, 544), gammay2)

                // C
                mstore(add(_pPairing, 576), calldataload(pC))
                mstore(add(_pPairing, 608), calldataload(add(pC, 32)))

                // delta2
                mstore(add(_pPairing, 640), deltax1)
                mstore(add(_pPairing, 672), deltax2)
                mstore(add(_pPairing, 704), deltay1)
                mstore(add(_pPairing, 736), deltay2)


                let success := staticcall(sub(gas(), 2000), 8, _pPairing, 768, _pPairing, 0x20)

                isOk := and(success, mload(_pPairing))
            }

            let pMem := mload(0x40)
            mstore(0x40, add(pMem, pLastMem))

            // Validate that all evaluations ∈ F
            
            checkField(calldataload(add(_pubSignals, 0)))
            
            checkField(calldataload(add(_pubSignals, 32)))
            
            checkField(calldataload(add(_pubSignals, 64)))
            
            checkField(calldataload(add(_pubSignals, 96)))
            
            checkField(calldataload(add(_pubSignals, 128)))
            
            checkField(calldataload(add(_pubSignals, 160)))
            
            checkField(calldataload(add(_pubSignals, 192)))
            
            checkField(calldataload(add(_pubSignals, 224)))
            
            checkField(calldataload(add(_pubSignals, 256)))
            
            checkField(calldataload(add(_pubSignals, 288)))
            
            checkField(calldataload(add(_pubSignals, 320)))
            
            checkField(calldataload(add(_pubSignals, 352)))
            
            checkField(calldataload(add(_pubSignals, 384)))
            
            checkField(calldataload(add(_pubSignals, 416)))
            
            checkField(calldataload(add(_pubSignals, 448)))
            
            checkField(calldataload(add(_pubSignals, 480)))
            
            checkField(calldataload(add(_pubSignals, 512)))
            
            checkField(calldataload(add(_pubSignals, 544)))
            

            // Validate all evaluations
            let isValid := checkPairing(_pA, _pB, _pC, _pubSignals, pMem)

            mstore(0, isValid)
             return(0, 0x20)
         }
     }
 }

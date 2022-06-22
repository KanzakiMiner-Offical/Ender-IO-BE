ModAPI​.​addAPICallback​(​"KernelExtension"​,​ ​function​(​api​)​ ​{ 
 ​    ​if​(​typeof​ ​api​.​getKEXVersionCode​ ​===​ ​"function"​ ​&&​ ​api​.​getKEXVersionCode​(​)​ ​>=​ ​220)​ ​{ 
 ​        ​Launch​(​{​ ​KEX​: ​api​ ​}​)​; 
 ​    ​}​ ​else​ ​Logger​.​Log​(​"Failed to launch EnderIO. You must have at least 2.2 version of Kernel Extension!"​,​ ​"ENDER IO"​)​;
}​)​;
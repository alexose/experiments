include <./flexbatter.scad>
include <./HoldingBox..V1.1.scad>

translate([-8, -11, -3]) flexbatter18650(n=2);

wi=45;	// inner width, length & heigth
li=120;
h=15;
separator=0;

rotate(90) cover();
translate([0,80,0]) rotate(90) box();
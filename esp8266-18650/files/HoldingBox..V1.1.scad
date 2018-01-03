// V 1.1 - added opening helper and an optional separating wall

wi=60;	// inner width, length & heigth
li=85;
h=28;
th=3;	// wall thickness
r=3;	// radius of rounded corners
opening_help=true;	// make a gap to ease opening of the cover, f.ex.
		// with a coin - girls are afraid of their finger nails ;-)
separator=13;	// generate a separating wall inside - set to 0 for none

ri=r-th;	// needed for the cover
if (ri<=0){
	ri=e;	// needs to be larger than 0 for proper results
}

e=0.01;
l=li-2*r;
w=wi-2*r;

module box(){
	difference(){
		translate([0,0,-th])hull(){
			for (i=[[-w/2,-l/2],[-w/2,l/2],[w/2,-l/2],[w/2,l/2]]){
				translate(i)cylinder(r=r+th,h=h+th,$fn=8*r);
			}
		}
		hull(){
			for (i=[[-w/2,-l/2],[-w/2,l/2,],[w/2,-l/2],[w/2,l/2]]){
				translate(i)cylinder(r=r,h=h,$fn=8*r);
			}
		}
		translate([-w/2,l/2+r,h-2])rotate([0,90,0])cylinder(d=1.2,h=w,$fn=12);
		translate([-w/2,-l/2-r,h-2])rotate([0,90,0])cylinder(d=1.2,h=w,$fn=12);
		translate([w/2+r,l/2,h-2])rotate([90,0,0])cylinder(d=1.2,h=l,$fn=12);
		translate([-w/2-r,l/2,h-2])rotate([90,0,0])cylinder(d=1.2,h=l,$fn=12);

		// if you need some adjustment for the opening helper size or position,
		// this is the right place
		if (opening_help)translate([w/2-10,l/2+13.5,h-1.8])cylinder(d=20,h=10,$fn=32);
	}
	if (separator>0){
		translate([separator-wi/2,-li/2-e,-e])difference(){
			cube([th,li+2*e,h]);
			translate([-e,-e,h-3])cube([th+2*e,th+2+2*e,5]);
			translate([-e,-e+li-th-2,h-3])cube([th+2+2*e,2*th,5]);
		}
	}
}

module cover(){
	translate([0,0,-th])hull(){
		for (i=[[-w/2,-l/2],[-w/2,l/2],[w/2,-l/2],[w/2,l/2]]){
			translate(i)cylinder(r=r+th,h=th,$fn=8*r);
		}
	}
	difference(){
		translate([0,0,-th])hull(){
			for (i=[[-w/2,-l/2],[-w/2,l/2],[w/2,-l/2],[w/2,l/2]]){
				translate(i)cylinder(r=r,h=th+3,$fn=8*r);
			}
		}
		hull(){
			for (i=[[-w/2,-l/2],[-w/2,l/2],[w/2,-l/2],[w/2,l/2]]){
				if (r>th){
					translate(i)cylinder(r=r-th,h=3,$fn=8*r);
				}else{
					translate(i)cylinder(r=e,h=3,$fn=8*r);
				}
			}
		}
	}
	translate([-w/2+1,l/2+r-0.2,2])rotate([0,90,0])cylinder(d=1.2,h=w-2,$fn=12);
	translate([-w/2+1,-l/2-r+0.2,2])rotate([0,90,0])cylinder(d=1.2,h=w-2,$fn=12);
	translate([w/2+r-0.2,l/2-1,2])rotate([90,0,0])cylinder(d=1.2,h=l-2,$fn=12);
	translate([-w/2-r+0.2,l/2-1,2])rotate([90,0,0])cylinder(d=1.2,h=l-2,$fn=12);

}

//box();
//translate([0,li+3+2*th,0])
//	cover();
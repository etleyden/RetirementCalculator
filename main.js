$(document).ready(function() {
  //adjustable user interface
  var gui = new dat.GUI({name: 'GUI!'});

  // Creates the controllers for each variable.
  var p = {Principle: 1000};
  gui.add(p, 'Principle', 0, 1 * Math.pow(10, 10));
  var g = {Growth_Rate: 0.1};
  gui.add(g, "Growth_Rate", 0, 1);
  var c = {Timely_Contribution: 40};
  gui.add(c, "Timely_Contribution", 0, 50000);
  var f = {Annual_Frequency:26};
  gui.add(f, "Annual_Frequency", 0, 365);
  var t = {Years: 45};
  gui.add(t, "Years", 0, 130);
  var y = {YearsLeft: 35};
  gui.add(y,"YearsLeft", 0,130);

  setInterval(function (){
    //total amount saved into an investment account
    var saved = calculate(p.Principle,
        g.Growth_Rate,
        c.Timely_Contribution,
        f.Annual_Frequency,
        t.Years);
    //the total amount saved spread over the amount of years the money is intended to last. 
    var retirementIncome = saved/y.YearsLeft;
    //annual income from the return on investment alone
    var annualPassive = saved*(1 + g.Growth_Rate) - saved;
    //monthly income from the return on investment alone.
    var monthlyPassive = annualPassive / 12;
    $("#saved").html("$" + numberWithCommas(saved.toFixed(2)));
    $("#retirementIncome").html("$" + numberWithCommas((retirementIncome).toFixed(2)));
    $("#sittingIncome").html("$"  + numberWithCommas(annualPassive.toFixed(2)));
    $("#monthlyIncome").html("$" + numberWithCommas(monthlyPassive.toFixed(2)));
  }, 1000/10);
});
function calculate(p, g, c, f, t) {
  var z = p * (1 + (g/f)) + c; //Principle(1 + Growth/Frequency) + Contribution
  for(var i = 1; i <= f*t; i++) { //Until Number of Total Contributions has been calculated
    z = z * (1 + (g/f)) + c;
  }
  //return z;
  return z;
}
function numberWithCommas(num) {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}

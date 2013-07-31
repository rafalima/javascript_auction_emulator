window.onload = function() {
  var idInterval = null;

  document.getElementById("submit").onclick=function() {
    var auction = new Auction();
    auction.startAuction();
    var autoBid = new AutomaticBid();
    autoBid.autoBid();
  
  };

  document.getElementById("bid").onclick = function() {
    var auction = new Auction();
    auction.performBid();
  }

}

function AutomaticBid() {
  var auction = new Auction();
  var endBid;
  auction.infinitAuctionCheck() ? endBid = 1 : endBid = 0;


  var buyer1 = new Buyer("david",auction.getTime(),endBid);
  var buyer2 = new Buyer("roger",auction.getTime(),endBid);
  var buyer3 = new Buyer("richard",auction.getTime(),endBid);
  var buyer4 = new Buyer("nick",auction.getTime(),endBid);
  var buyer5 = new Buyer("pinky",auction.getTime(),endBid);


  this.autoBid = function() {
    var ref = this;
    var randomTime;
    //if (auction.infinitAuctionCheck()) {
    var interval =  setInterval(function(){
       randomTime = Math.floor((Math.random()*auction.getTime())+endBid);
      if(auction.getTime() == 0)
       clearInterval(interval);
      else if (auction.getTime() == randomTime) {
        auction.performBid(buyer2.getName());
      } 
     },900); 
   // }
  }

  
}

function Buyer(_name,_time,_endBid) {
  //nao funciona corretamente
  this.randomTime = Math.floor((Math.random()*_time)+_endBid);

  this.getName = function() {
    return _name;
  }

  this.getRandomTime = function() {
    return this.randomTime;
  }

}


function Auction() {
  var inputValue = document.getElementById("inputValue").value || "0,00";
  var inputTime = parseInt(document.getElementById("inputTime").value) || 10;
  var inputInfinitAuction = document.getElementsByName("infinitAuction");
  var inputUser = document.getElementById("inputUser").value || "rafael";


  var originalTime = inputTime;

  this.valueAuction = document.getElementById("valueAuction");
  this.timeAuction = document.getElementById("timeAuction");
  this.playerAuction = document.getElementById("playerAuction");
  this.infinitAuction = inputInfinitAuction;
  this.userAuction = document.getElementById("userAuction");


  this.startAuction = function() {
    this.setValue(inputValue);

    this.startTimer();

  }

  this.startTimer = function() {
    var ref = this;
    var counter = originalTime;
    this.setTime(inputTime);
    idInterval = setInterval(function() {
     /* if ( ref.infinitAuctionCheck() && counter <= 0 )
        counter = originalTime;
      else if (counter <= 0)
        clearInterval(idInterval);
    */
    if (counter <= 0)
      clearInterval(idInterval);


     ref.setTime(counter);
     counter--;
   
    } ,1000);

  };


  this.infinitAuctionCheck = function() {
    var checkedValue;

    for (var i=0; i < this.infinitAuction.length; i++) {
      if (this.infinitAuction[i].checked)
        checkedValue = this.infinitAuction[i].value;

    }

    if (checkedValue == "yes")
      return true;
    else if (checkedValue == "no")
      return false;
  };
 
  this.setValue = function(_value) {
    var value = _value.toString().replace(".",",");
    this.valueAuction.innerHTML = value;
  };

  this.setTime = function(_value) {
    this.timeAuction.innerHTML = _value;
  };
  
  this.setUser = function(_value) {
    this.userAuction.innerHTML = _value;
  }

  this.getValue = function() {
    return parseFloat(this.valueAuction.innerHTML.replace(",","."));
  };

  this.getTime = function() {
    return parseInt(this.timeAuction.innerHTML);
  };

  
  this.getUser = function() {
    return this.userAuction.innerHTML;
  }

  this.performBid = function(_user) {
    _user = _user || inputUser;
    var bid = new Bid();
    bid.setUser(_user);
    var value = bid.incrementValue(this.getValue());
    this.setValue(value);
    clearInterval(idInterval);
    this.startTimer();
  }


}

function Bid() {
  this.userAuction = document.getElementById("userAuction");

  this.getUser = function() {
    return this.userAuction.innerHTML;
  }

  this.setUser = function(_user) {
    this.userAuction.innerHTML = _user;
  }

  this.incrementValue = function(_value) {
    _value = _value + 0.01;
    return _value.toFixed(2);
  }

}



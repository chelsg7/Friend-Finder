
var friends=require("../data/friends.js");

module.exports=function(app){
  app.get("/api/friends",function(req,res){
      res.json(friends);
  });
  app.post("/api/friends",function(req,res){
      console.log(req.body.name);
      console.log(req.body);
      
      var user = req.body;
      var userAnswers = user["scores[]"].map(parseFloat);

      var petArrAns=friends.map(function(friend){
        return friend.scores
      })
      var answerDifferencesArray=[];
      
      petArrAns.forEach(function(userScoring){
        var differences=[];

        userScoring.forEach(function(score,index){
          var scoreDiff = userAnswers[index] - score;
          differences.push(Math.abs(scoreDiff));
        })
        calcDifference = differences.reduce(function(sum,score){
          return sum+score
        })
        answerDifferencesArray.push(calcDifference);
      })
      console.log(answerDifferencesArray);
      friends.push(user);

      var getLow = function (array){
        return array.reduce(function(a,b){
          return Math.min(a,b);
        });
      }
      var lowScore= getLow(answerDifferencesArray);
      var bestMatch=answerDifferencesArray.indexOf(lowScore);
      
      // console.log("Lowest Score Difference: "+ lowScore);
      console.log("Best Match Array Index # : "+bestMatch);
      console.log("The Best Pet Match: "+friends[bestMatch].name);

      res.json(friends[bestMatch]);//Returning friends object as JSON.//
  });
}
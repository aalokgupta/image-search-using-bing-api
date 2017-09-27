

var insert_search_item_in_db = function(query){
  MongoClient.connect(uri, function(err, db){
    if(err)
      console.log(err);
    else{
      var date = new Date();
      var obj = [{"query-at": date, "query-string": query}]
      db.collection('search_history').insert(obj, function(err, res){
        if(err)
          console.log("There is some problem in inserting the data");
      });
      db.close();
    }
  });
}


var find_latest_searh_history_from_db = function(){
  MongoClient.connect(uri, function(err, db){
    if(err)
      console.log(err);
    else{
      var cursor = db.collection('search_history').find({}, {"query-at": 1, "query-string": 1}).sort({"query-at": -1}).limit(5);
      msg = [];
      cursor.forEach(function(doc){
           var res = {};
            res.query = doc["query-at"];
            res.str = doc["query-string"];
            msg.push({"time": doc["query-at"],
                     "query": doc["query-string"]});
          
            console.log("query-at"+ doc["query-at"],
                       "   query-string"+ doc["query-string"]);

      });
    }
   db.close();
  });
}
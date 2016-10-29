
      var qNumber= 0;//問題番号初期値
      //問題文設定。画面から取得。
      var questions_all = document.getElementById("questions_all").innerText;
      var questions = questions_all.split(",");

      //['Более 20 турецких танков пересекли границу с Сирией в районе города Аль-Раи','да','привет'];


       //画面描写パーツの定義
        var question = document.getElementById("question");
        var target = document.getElementById("answer");
        var typed = document.getElementById("typed");
        var timecount = document.getElementById("timecount");
        var typedtxt = new Array(); //Show typed text by user

       //var keycodes = new Array();
       var misstype = new Array();//ミスタイプ情報用

       var totalTime = 0;
       var charnum = 0;
       var maxchar = 0; //問題の文字列の長さを測定

       //First question
       newQuestion(qNumber);

       var ngTotal = {};//NGカウント用Object
       
       //Question renew
       function newQuestion(qNumber){
             //全問クリア
             if(qNumber > questions.length -1){ 
              //count NG ミスタイプをカウント
              misstype.forEach(function(value){
                if(!ngTotal[value]){
                  ngTotal[value]=1;
                }else {
                  ngTotal[value] += 1;
                }
              });

             ngArray = sortObject(ngTotal);
             //ngMessage = "最もミスタイプしたキーは、  " + ngArray[0].key + "  です。気をつけましょう！";

             alert('complete'+ 'あなたのタイム合計（秒）:  '+totalTime/100);
             window.location.reload() ;
           }

         charnum = 0;
         maxchar = 0;
         typed.innerHTML = "";
         maxchar = stoKey(questions[qNumber]).length;
         question.innerHTML = questions[qNumber]; //Show question
         document.getElementById("qcount").innerHTML = qNumber + 1;
         run(); //start count
       }

      function skip(){
        qNumber = document.getElementById("qcount").innerHTML;
        qNumber = qNumber -1;
        qNumber += 1;
        stop();
        totalTime += Number(document.getElementById('sec').innerHTML)*100;
        setTimeout("newQuestion(qNumber)",500);
      }

      function reset(){
        window.location.reload() ;
      }

     //問題文を配列に変換
     function stoKey(question){
         wordtoArray = question.split("");
         return wordtoArray;
     }

     //オブジェクトをソート（NGカウントに使用）
     function sortObject(obj) {
            var arr = [];
            var prop;
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    arr.push({
                        'key': prop,
                        'value': obj[prop]
                    });
                }
            }
            arr.sort(function(a, b) {
                return a.value - b.value;
            });
            arr.reverse();
            return arr; // returns array
        }

      //
      //timecount タイム計測機能
      var startTime,
      timerId;

      function run() {
        startTime = (new Date()).getTime(); //set start time
        timer();
      }

      function stop() { //stop timecount
        clearTimeout(timerId);
      }

      function timer() {
        //document.getElementById('sec').innerHTML = (((new Date()).getTime() - startTime) / 1000).toFixed(2);
        timerId = setTimeout(function() { 
          timer(); //0.1 sec ごとにtimer function を実行。これでタイマーが動く。
        }, 100);
    
      }

      //キーが押された時の処理
      document.onkeypress = function(e){
         //var currentKey = e.keyCode;
         var currentKey = e.key;
         if(wordtoArray[charnum] == currentKey){
          target.innerHTML = "OK" + currentKey;
          charnum += 1;
          addchar = questions[qNumber].substr(0, charnum); //get character typed by user
          typed.innerHTML = addchar; 

            if (charnum == maxchar){ //when last character
              target.innerHTML = "Clear" + currentKey;
              qNumber += 1;
              stop();
              totalTime += Number(document.getElementById('sec').innerHTML)*100;
              setTimeout("newQuestion(qNumber)",500);
            }
        } else {//type false
          target.innerHTML = "NG" + currentKey;
          misstype.push(wordtoArray[charnum]);
        }

        };
  $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });

      var qNumber= 0;//問題番号初期値
      //問題文設定。画面から取得。
      var questions_all = document.getElementById("questions_all").innerText;
      var questions = questions_all.split(",");
      document.getElementById("qtotal").innerHTML = questions.length;
      //['Более 20 турецких танков пересекли границу с Сирией в районе города Аль-Раи','да','привет'];


       //画面描写パーツの定義
        var question = document.getElementById("question");
        var target = document.getElementById("answer");
        var typed = document.getElementById("typed");
        var timecount = document.getElementById("timecount");
        var typedtxt = new Array(); //Show typed text by user

       //keyboard type
       function keyboardChange(){
        var type1 = document.getElementById("test1");
        var type2 = document.getElementById("test2");

        if(type1.checked){
          document.getElementById("keyboard_1").style.display = "block";
          document.getElementById("keyboard_2").style.display = "none";
        } else {
          document.getElementById("keyboard_2").style.display = "block";
          document.getElementById("keyboard_1").style.display = "none";
        }
       }

       var misstype = new Array();//ミスタイプ情報用
       var ngTotal = {};//NGカウント用Object

       var totalTime = 0;
       var totalCharnum = 0;//文字数の総計をカウント
       var charnum = 0;//１問ごとの文字数（・・文字目）をカウント
       var typeCount = 0;//１文字ごとのタイプ数をカウント（一発正解判定用）
       var okCount = 0;//一発正解の文字数をカウント
       var maxchar = 0; //問題の文字列の長さを測定

       //First question
       newQuestion(qNumber);


       //Question renew
       function newQuestion(qNumber){
             //全問クリア
             if(qNumber > questions.length -1){ 
              //count NG ミスタイプをカウント

             //open modal window

             var fineRate = okCount/totalCharnum *100; //正確性



             if(fineRate < 100){
                //ミスタイプのうちわけカウント
                misstype.forEach(function(value){
                  if(!ngTotal[value]){
                    ngTotal[value]=1;
                  }else {
                    ngTotal[value] += 1;
                  }
                });
                //ミスタイプ多い順にソート
               ngArray = sortObject(ngTotal);
               var ngMessage = 'よくミスするキーは  ' + ngArray[0].key +'  です。気をつけましょう';
             } else {
              var ngMessage = 'ミスはゼロです。おめでとうございます！';
            }

             var resultMessage = '<p>'+ 'あなたのタイム合計（秒）:  '+totalTime/100 + '</p><p>正確性；' + fineRate.toFixed(2) + '%</p><p>' + ngMessage +'</p>';
             document.getElementById("result").innerHTML = resultMessage;
             $('#modal2').openModal();

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
         typeCount += 1;
         var currentKey = String.fromCharCode(e.charCode);
         //キーが正解のとき
         if(wordtoArray[charnum] == currentKey){
            if(typeCount < 2){
              okCount += 1;
            }
          typeCount = 0;
          target.innerHTML = "OK" + currentKey;//for debug

          charnum += 1;
          totalCharnum += 1;
          addchar = questions[qNumber].substr(0, charnum); //get character typed by user
          typed.innerHTML = addchar;


            if (charnum == maxchar){ //when last character
              target.innerHTML = "Clear" + currentKey;
              qNumber += 1;
              stop();
              totalTime += Number(document.getElementById('sec').innerHTML)*100;
              setTimeout("newQuestion(qNumber)",500);
              soundOk();
            }
            //キーが間違いの時
        } else {//type false
          target.innerHTML = "NG" + currentKey;
          soundNg();
          misstype.push(wordtoArray[charnum]);
        }

        };

        function soundOk()
        {
          // [ID:sound-file]の音声ファイルを再生[play()]する
          document.getElementById('sound-ok').play() ;
        }

        function soundNg()
        {
          // [ID:sound-file]の音声ファイルを再生[play()]する
          document.getElementById('sound-ng').play() ;
        }
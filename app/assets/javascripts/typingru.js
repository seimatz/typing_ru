
     var rusKeycodes = {
      48:"0",
      0:")",
      49:"1",
      33:"!",
      50:"2",
      34:'"',
      51:"3",
      35:"№",
      52:"4",
      36:";",
      53:"5",
      37:"%",
      54:"6",
      38:":",
      55:"7",
      39:"?",
      56:"8",
      40:"*",
      57:"9",
      41:"(",
      97:"ф",
      65:"Ф",
      98:"и",
      66:"И",
      99:"с",
      67:"С",
      100:"в",
      68:"В",
      101:"у",
      69:"У",
      102:"а",
      70:"А",
      103:"п",
      71:"П",
      104:"р",
      72:"Р",
      105:"ш",
      73:"Ш",
      106:"о",
      74:"О",
      107:"л",
      75:"Л",
      108:"д",
      76:"Д",
      109:"ь",
      77:"Ь",
      110:"т",
      78:"Т",
      111:"щ",
      79:"Щ",
      112:"з",
      80:"З",
      113:"й",
      81:"Й",
      114:"к",
      82:"К",
      115:"ы",
      83:"Ы",
      116:"е",
      84:"Е",
      117:"г",
      85:"Г",
      118:"м",
      86:"М",
      119:"ц",
      87:"Ц",
      120:"ч",
      88:"Ч",
      121:"н",
      89:"Н",
      122:"я",
      90:"Я",
      45:"-",
      61:"_",
      94:"=",
      126:"+",
      92:"",
      124:"",
      64:"х",
      96:"Х",
      91:"ъ",
      123:"Ъ",
      59:"ж",
      43:"Ж",
      58:"э",
      42:"Э",
      125:"/",
      44:"б",
      60:"Б",
      46:"ю",
      62:"Ю",
      47:".",
      63:",",
      32:" "
            };

      var rusAlphabet = new Array();
      //キーコードとアルファベットを反転（アルファベットをキーとした配列作成）
      for (var key in rusKeycodes){
          var newkey = rusKeycodes[key];
          rusAlphabet[newkey] = key;
        }

      var qNumber= 0;//問題番号初期値
      //問題文設定。ここにajaxで呼び出す
      var questions_all = document.getElementById("questions_all").innerText;
      var questions = questions_all.split(",");

      //['Более 20 турецких танков пересекли границу с Сирией в районе города Аль-Раи','да','привет'];


       //画面描写パーツの定義
        var question = document.getElementById("question");
        var target = document.getElementById("answer");
        var typed = document.getElementById("typed");
        var timecount = document.getElementById("timecount");
        var typedtxt = new Array(); //Show typed text by user

       var keycodes = new Array();
       var misstype = new Array();

       var totalTime = 0;
       var charnum = 0;
       var maxchar = 0; //問題の文字列の長さを測定

       //First question
       newQuestion(qNumber);

       var ngTotal = {};
       //Question renew 
       function newQuestion(qNumber){
         if(qNumber > questions.length -1){ //全問クリア
          misstype.forEach(function(value){
            if(!ngTotal[value]){
              ngTotal[value]=1;
            }else {
              ngTotal[value] += 1;
            }
          });
          
          alert('complete'+ 'あなたのタイム合計（秒）:  '+totalTime/100);
          console.log(ngTotal);
          console.log(misstype);
         }
         charnum = 0;
         maxchar = 0;
         keycodes = [];
         typed.innerHTML = "";
         keycodes = stoKey(questions[qNumber]);
         maxchar = keycodes.length;
         question.innerHTML = questions[qNumber]; //Show question
         run(); //start count
       }

      

     //問題文をキーコードの配列に変換
     function stoKey(question){
         wordtoArray = question.split("");
         wordtoArray.forEach(function(value) { //convert to keycode array
            keycodes.push(rusAlphabet[value]);
          
         });
         console.log(keycodes);
         return keycodes;
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
         var currentKey = e.keyCode;
        if(keycodes[charnum] == currentKey) { //good typed
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
          var key = keycodes[charnum];
          misstype.push(keycodes[charnum]);
        } 

        };
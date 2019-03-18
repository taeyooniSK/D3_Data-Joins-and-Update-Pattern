var quotes = [
  {
    quote: "I see dead people.",
    movie: "The Sixth Sense",
    year: 1999,
    rating: "PG-13"
  }, {
    quote: "May the force be with you.",
    movie: "Star Wars: Episode IV - A New Hope",
    year: 1977,
    rating: "PG"
  }, {
    quote: "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?",
    movie: "Dirty Harry",
    year: 1971,
    rating: "R"
  }, {
    quote: "You had me at 'hello.'",
    movie: "Jerry Maguire",
    year: 1996,
    rating: "R"
  }, {
    quote: "Just keep swimming. Just keep swimming. Swimming, swimming, swiming.",
    movie: "Finding Nemo",
    year: 2003,
    rating: "G"
  }
];

var newQuotes = [
  {
    quote: "Houston, we have a problem.",
    movie: "Apollo 13",
    year: 1995,
    rating: "PG-13"
  },{
    quote: "Gentlmen, you can't fight in here! This is the war room!",
    movie: "Dr. Strangelove or: How I learned to Stop Worrying and Love the Bomb",
    year: 1964,
    rating: "PG"
  }
];
  


let colors = {
  "G" : "#3cff00",
  "PG": "#f9ff00",
  "PG-13": "#ff9000",
  "R": "#ff0000"
};


d3.select("#quotes")
    .style("list-style", "none")
  .selectAll("li")
  .data(quotes)
  .enter()
  .append("li")
    .text( d => {
        return `'${d.quote}' - '${d.movie}' ('${d.year}')`;
    })
    .style("margin", "20px")
    .style("padding", "20px")
    .style("font-size", d => 
      d.quote.length < 20 ? "2em" : "1em")
    .style("background-color", d => 
      colors[d.rating]
    )
    .style("border-radius", "8px");

   

    var nonRQuotes = quotes.filter( movie => {
      return movie.rating !== "R";
    })



    /*
    var list = d3.select("#quotes") // 만약 parent element를 d3.select로 선택하지 않고 코드를 짜면 html에 추가함(#quotes에 append를 하는 것이 아니라..그래서 주의해야함)
                .style("list-style", "none") // 그래서 항상 내가 추가하고싶은 parent 요소를 선택후에 children요소들을 선택해라
                .selectAll("li") // children 요소

    var add = d3.select("#add");

    add.on("click", function(){         // 여기서 주목해야할 것은 내가 selection에(list변수안에 선택된 요소) 변화를 주면 새롭게 생긴 list item에만 변화가 생김
      quotes = quotes.concat(newQuotes);   // 그 이유는 enter() 셀렉션을 전달하기 때문
      list
      .data(quotes)
      .enter() // <---
      .append("li")
        .text( d => {
            return `'${d.quote}' - '${d.movie}' ('${d.year}')`;
        })
        .style("margin", "20px")
        .style("padding", "20px")
        .style("font-size", d => 
          d.quote.length < 20 ? "2em" : "1em")
        .style("background-color", d => 
          colors[d.rating]
        )
        .style("border-radius", "8px");

        add.remove();
    });
*/
      /* Selection Types 
      
    D3에서의 모든 셀렉션에서는 3부분을 가지고 있다고 할 수 있는데
    1. enter selection(data with no elements on the page) 
    2. exit selection(elements with no data)
    3. update selection( data + elements) -> elements on the page that are successfully joined to data (enter selection와 exit selection의 교집합)

    D3는 이 그룹들을 별개로 다룬다.
      
    
      */
  


     /*

     var list = d3.select("#quotes") 
     .style("list-style", "none") 
     .selectAll("li") 

      var add = d3.select("#add");

     add.on("click", function(){         // 여기서 주목해야할 것은 내가 selection에(list변수안에 선택된 요소) 변화를 주면 새롭게 생긴 list item에만 변화가 생김
      quotes = quotes.concat(newQuotes);   // 그 이유는 enter() 셀렉션을 전달하기 때문
      list
      .data(quotes)
      .enter() // <---
      .append("li")
        .text( d => {
            return `'${d.quote}' - '${d.movie}' ('${d.year}')`;
        })
        .style("margin", "20px")
        .style("padding", "0") // 여기 패딩을 0으로 처리하면 새로운 quote에만 변화가 적용됨 왜냐하면 enter selection에 있는 node를 목표로했기때문(enter())
        .style("font-size", d =>                 // 만약 각 enter selection, exit selection을 따로 style하고 싶다면 이게 좋은 방법이다.
          d.quote.length < 20 ? "2em" : "1em")
        .style("background-color", d => 
          colors[d.rating]
        )
        .style("border-radius", "8px");

        add.remove();
    });

*/


/* Merging Selections : Merges selection and otherSelection together into a new selection
  selection.merge(otherSelection)
    General Update Pattern(merge)

    1. Grab the update selection, make any changes unique to that selection, and store the selection in a variable.
    2. Grab the exit selection and remove any unnecessary elements.    상황에 따라 내가 뭔가 지우고 싶으면 2번과정
    3. Grab the enter selection and make any changes unqiue to that selection.   뭔가 추가하고싶으면 3번 과정을 하면됨
    4. Merge the enter and update selections, and make any changes that you want to be shared across both selections.



*/
    var listItems = d3.select("#quotes") 
    .style("list-style", "none") 
    .selectAll("li") 

     var add = d3.select("#add");

    add.on("click", function(){         // 여기서 주목해야할 것은 내가 selection에(list변수안에 선택된 요소) 변화를 주면 새롭게 생긴 list item에만 변화가 생김
     quotes = quotes.concat(newQuotes);   // 그 이유는 enter() 셀렉션을 전달하기 때문

     listItems
     .data(quotes)
     .enter() // <---
     .append("li")
       .text( d => {
           return `'${d.quote}' - '${d.movie}' ('${d.year}')`;
       })
       .style("margin", "20px")
       .style("padding", "0") // 여기 패딩을 0으로 처리하면 새로운 quote에만 변화가 적용됨 왜냐하면 enter selection에 있는 node를 목표로했기때문(enter())
       .style("font-size", d =>                 // 만약 각 enter selection, exit selection을 따로 style하고 싶다면 이게 좋은 방법이다.
         d.quote.length < 20 ? "2em" : "1em")
       .style("background-color", d => 
         colors[d.rating]
       )
       .style("border-radius", "8px")
      .merge(listItems)    // listItems를 변수에 저장한 이유가 이것 때문이다. merge메소드를 여기 씀으로써 
       .style("color", "#5599ff");

       add.remove();
   });
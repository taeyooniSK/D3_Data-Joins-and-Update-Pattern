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

    // Let's suppose that I want to remove 'Finding Nemo' quote from the page.

    //quotes.pop(); // pop메소드를 써서 quotes 객체로 된 배열안의 finding nemo 데이터를 지운다. 하지만 page에선 계속 보임
    // 그럼 d3를 이용해서 data를 업데이트(더이상 데이터가 없다는 것을 인식시켜서) 해줘야한다.

    //d3.selectAll("li")
    //  .data(quotes) // (데이터를 계속 추적함) 콘솔창에서 보면 지워진 데이터는 _exit property안에 들어가 있음(왜냐하면 그 li요소에 일치하는 데이터가 없기때문에 제거되어야한다고 인식하고 _exit property로 이동)


    var nonRQuotes = quotes.filter( movie => {
      return movie.rating !== "R";
    })

  /*
 // 1번째 해결방법

    d3.selectAll("li") // nonRQoute변수에 담겨진 데이터를 li에 binding시켜주고 나머지 데이터를 지운다.(데이터와 일치하지않는 li(즉 위에 필터함수에서 R에 해당하여 필터링되지 못한 것들)) 
      .data(nonRQuotes)
      .exit()
      .remove(); // 이렇게 실행하면 정확히 실행될 것 같지만 제대로 실행되지 않음. 왜냐하면 데이터가 by default로 index 순으로 요소들과 연결이 되어있기 떄문 그래서 5개 데이터 중 마지막 2개의 데이터가 지워짐

    d3.selectAll("li")
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
   
*/
  
    // 2번째 해결방법:이걸 똑바로 실행되게 하려면 data메소드의 두번째 argument로 key function(부가설명: Return value used to join elements and data)을 써줘야함

      // d3.selectAll("li")
      //   .data(nonRQuotes, d => {
      //     return d.quote;           // 이렇게 하면 정상적으로 작동하는데 key function으로 nonRQuotes에서 필터링된 데이터의 quote 프로퍼티에 대한 값을 연결시켜주고
      //   })                          // 만약 필터링되지 않았던 데이터들(나머지 데이터와 일치하지 않는 데이터들은 _exit프로퍼티로 이동함)
      //   .exit()                  // exit메소드로 접근하여
      //   .remove();               //그 나머지 데이터를 제거
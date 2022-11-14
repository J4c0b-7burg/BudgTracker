const express = require('express');
const budgets = require('./models/budget');
const methodOverride = require("method-override")

const app = express();
const PORT = 3001;

app.use("/static", express.static("public"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//--------------------------------------------------------------------------------------------

app.get('/budgets', (request, response) => {
    console.log(budgets)
    response.render(
        'index.ejs',
        {
            allBudgets:budgets,
            budgets
        }
    );
});

app.get("/budgets/new", (request, response) => {
    response.render(
        "new.ejs",
        // {
        //     allBudgets:budgets
        // }
    )
})

app.post("/budgets", (request, response) => {
    console.log(request.body)
    budgets.push(request.body);
    console.log(budgets)
    response.redirect("/budgets");
});

app.get('/budgets/:index', (request, response) => {
    response.render('show.ejs', {
        budget: budgets[request.params.index],
        index: request.params.id,
    });
});
//--------------------------------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
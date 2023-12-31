import { toHaveAccessibleDescription } from "@testing-library/jest-dom/matchers.js";
import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import {db} from "./firebaseDb.js";
import {doc,collection, addDoc, setDoc, getDoc, updateDoc, deleteDoc, getDocs} from "firebase/firestore"; 
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

var predictor = require("./predictor.js")
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fruit: [
                "Tomato",
                "Carrot",
                "Lettuce",
                "Cucumber",
                "Spinach",
                "Bell Pepper",
                "Broccoli",
                "Cabbage",
                "Onion",
                "Strawberry",
                "Potato",
                "Zucchini",
                "Green Bean",
                "Radish",
                "Watermelon",
                "Pumpkin",
                "Sweet Corn",
                "Cauliflower",
                "Eggplant",
                "Cilantro",
                "Cantaloupe",
                "Garlic",
                "Kale",
                "Peas",
                "Beetroot",
                "Raspberry",
                "Blueberry",
                "Mint",
                "Parsley",
                "Cherry",
                "Grapes",
                "Squash",
                "Artichoke",
                "Asparagus",
                "Brussels",
                "Celery",
                "Collard Greens",
                "Green Onion",
                "Honeydew",
                "Kiwi",
                "Lima Beans",
                "Mango",
                "Peach",
                "Pear",
                "Pineapple",
                "Pomegranate",
                "Rhubarb",
                "Tomatillo",
                "Turnip",
                "Watercress",
            ],
            fallingFruit: [],
        };
        this.explore=this.explore.bind(this);
    }
    componentDidMount() {
        var fallingFruit = [];
        var x=0;
        for (let i = 0; i < this.state.fruit.length; i++) {
            var delay = Math.random() * 10;
            var fallDuration = (Math.random() * 10)/2 + 3;
            var spinDuration = Math.random() * 360 ;
            fallingFruit.push(<FallingFruit image={this.state.fruit[i] + ".png"} left={x+ "%"} delay={delay + "s"} fallDuration={fallDuration + "s"} spinDuration={spinDuration} />);
            x+=2;
        }
        this.setState({ fallingFruit });
        /*
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                alert(user.uid);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
        });*/
    }
    explore(){
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                window.location.href="/garden";
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }


    render() {
        return (
            <>
                
                
                {this.state.fallingFruit}
                <Link to="/" className="div" style={{position:"absolute",fontSize:"50px",left:"5%",top:"3%",color:"black"}}>garden.ai</Link>
                <Link
                    className="div button thing"
                    to="/catalogue"
                    style={{
                        width: "200px",
                        height: "50px",
                        left: "85%",
                        top: "5%",
                        fontSize: "20px",
                        color: "white",
                        backgroundColor: "rgba(0, 206, 10, 1)",
                        borderRadius: "5px",
                    }}
                >
                    <b>Plant Catalogue</b>
                </Link>
                <Link
                    className="div button thing"
                    to="/garden"
                    style={{
                        width: "120px",
                        height: "50px",
                        left: "77%",
                        top: "5%",
                        fontSize: "20px",
                        color: "white",
                        backgroundColor: "#00affa",
                        borderRadius: "5px",
                    }}
                >
                    <b>Garden</b>
                </Link>
                <div
                    className="div"
                    style={{
                        width: "32%",
                        height: "10%",
                        left: "34%",
                        top: "20%",
                        fontSize: "75px",
                        color: "black",
                    }}
                >
                    <b>UPGRADE YOUR</b>
                </div>
                <div
                    className="div highlight2"
                    style={{
                        width: "32%",
                        height: "17%",
                        left: "34%",
                        top: "32%",
                        fontSize: "140px",
                        color: "white",
                    }}
                >
                    <b>GARDEN</b>
                </div>
                <div
                    className="div"
                    style={{ width: "40%", left: "30%", top: "55%", fontSize: "30px" }}
                >
                    We use AI data analysis to manage your garden, preventing hundreds of
                    pounds of food being wasted.
                </div>
                <button onClick={this.explore}
                    className="div button thing"
                    to="/garden"
                    style={{
                        width: "300px",
                        height: "80px",
                        left: "810px",
                        top: "73%",
                        fontSize: "40px",
                        color: "white",
                        backgroundColor: "#00affa",
                        borderRadius: "5px",
                        border:"none",
                    }}
                >
                    <b>Explore</b>
                </button>
            </>
        );
    }
}
class Garden extends React.Component {
    constructor(props) {
        super(props);
        var crops=[
            "Tomato",
            "Carrot",
            "Lettuce",
            "Cucumber",
            "Spinach",
            "Bell Pepper",
            "Broccoli",
            "Cabbage",
            "Onion",
            "Strawberry",
            "Potato",
            "Zucchini",
            "Green Bean",
            "Radish",
            "Watermelon",
            "Pumpkin",
            "Sweet Corn",
            "Cauliflower",
            "Eggplant",
            "Cilantro",
            "Cantaloupe",
            "Garlic",
            "Kale",
            "Peas",
            "Beetroot",
            "Raspberry",
            "Blueberry",
            "Mint",
            "Parsley",
            "Cherry",
            "Grapes",
            "Squash",
            "Artichoke",
            "Asparagus",
            "Brussels",
            "Celery",
            "Collard Greens",
            "Green Onion",
            "Honeydew",
            "Kiwi",
            "Lima Beans",
            "Mango",
            "Peach",
            "Pear",
            "Pineapple",
            "Pomegranate",
            "Rhubarb",
            "Tomatillo",
            "Turnip",
            "Watercress",
        ];
        crops.sort();
        this.selectCrop=this.selectCrop.bind(this);
        
        var soilBlocks = [];
        var soilPositions = [];
        var gardenSize = 6;
        var x = 3;
        var y = 40;
        for (let i = 0; i < gardenSize; i++) {
            var soilPosition = [];
            for (let k = 0; k < gardenSize; k++) {
                soilBlocks.push(
                    <SoilBlock left={x + "%"} top={y + "%"} width="10%" height="20%" />
                );
                soilPosition.push([x, y]);
                x += 6;
                y += 7;
            }
            soilPositions.push(soilPosition);
            x = 3+ (i + 1) * 6;
            y = 40 - (i + 1) * 7;
        }
        var cropSelects=[];
        for(let i=0;i<crops.length;i++){
            var left="80%";
            if(i%2==1) left="91.5%"
            cropSelects.push(<CropSelector onClick={this.selectCrop} left={left} top={9+Math.floor(i/2)*18+"%"} width="100px" height="100px" cropName={crops[i]} border="2px solid rgba(0,0,0,0.1)"/>)
        }
        this.state = {
            soilBlocks: soilBlocks,
            soilPositions: soilPositions, 
            plants: [],
            plantPositions: [],
            cropSelects:cropSelects,
            cropSelected:"Tomato",
            selectX:"",
            selectY:"",
            predictAnswer:"",
            cropsPlaced:[],
            editingStyle:{color: "white",backgroundColor: "#346beb",border:"none",opacity:"1"},
            managingStyle:{color: "#346beb",backgroundColor: "transparent",border:"2px solid #346beb",opacity:"0"},
            cropTypes:[], //sample data
            cropTimes:[], //also sample data
            dayPx:0, //day to pixels ratio for timeline
            cropPredictions:[],
            cropMarkers:[],
        };
        this.placeFruit = this.placeFruit.bind(this);
        this.activateEditing=this.activateEditing.bind(this);
        this.activateManaging=this.activateManaging.bind(this);
        
    }
    async predictTime(cropName){
        var predictor = require("./predictor.js");
        predictor.initialize(() => {
            var answer=predictor.predict(cropName, 0);
            this.setState({predictAnswer:answer});
        });
    }
    componentDidMount(){
        this.selectCrop(null,"Blueberry");
    }
    selectCrop(event,cropName){
        var crops=[
            "Tomato",
            "Carrot",
            "Lettuce",
            "Cucumber",
            "Spinach",
            "Bell Pepper",
            "Broccoli",
            "Cabbage",
            "Onion",
            "Strawberry",
            "Potato",
            "Zucchini",
            "Green Bean",
            "Radish",
            "Watermelon",
            "Pumpkin",
            "Sweet Corn",
            "Cauliflower",
            "Eggplant",
            "Cilantro",
            "Cantaloupe",
            "Garlic",
            "Kale",
            "Peas",
            "Beetroot",
            "Raspberry",
            "Blueberry",
            "Mint",
            "Parsley",
            "Cherry",
            "Grapes",
            "Squash",
            "Artichoke",
            "Asparagus",
            "Brussels",
            "Celery",
            "Collard Greens",
            "Green Onion",
            "Honeydew",
            "Kiwi",
            "Lima Beans",
            "Mango",
            "Peach",
            "Pear",
            "Pineapple",
            "Pomegranate",
            "Rhubarb",
            "Tomatillo",
            "Turnip",
            "Watercress",
        ];
        crops.sort();
        var cropSelects=[];
        for(let i=0;i<crops.length;i++){
            var left="80%";
            if(i%2==1) left="91.5%"
            if(crops[i]==cropName)cropSelects.push(<CropSelector onClick={this.selectCrop} left={left} top={9+Math.floor(i/2)*18+"%"} width="100px" height="100px" cropName={crops[i]} border="2px solid rgba(0,0,0,1)"/>);
            else cropSelects.push(<CropSelector onClick={this.selectCrop} left={left} top={9+Math.floor(i/2)*18+"%"} width="100px" height="100px" cropName={crops[i]} border="2px solid rgba(0,0,0,0.1)"/>);
        }

       
        
        this.setState({cropSelected:cropName,cropSelects});
        
        
    }
    placeFruit(event) {
        if(this.state.editingStyle.color=="#346beb"){
            return;
        }
        var x = event.screenX / 19.2;
        var y = (event.screenY-50) / 10;
        var minDistance = 10000000;
        var minSoil = [];
    
        for (let i = 0; i < this.state.soilPositions.length; i++) {
            for (let k = 0; k < this.state.soilPositions[i].length; k++) {
                var sx = this.state.soilPositions[i][k][0] + 5;
                var sy = this.state.soilPositions[i][k][1] + 10;
                var distance = Math.sqrt(Math.pow(sx - x, 2) + Math.pow(sy - y, 2));
                if (distance < minDistance) {
                    minDistance = distance;
                    minSoil = [i, k];
                }
            }
        }
        
        var plants = this.state.plants;
        var plantPositions = this.state.plantPositions;
        var cropsPlaced=this.state.cropsPlaced;
        var alreadyPlanted = false;
        for (let i = 0; i < plantPositions.length; i++) {
            if (
                plantPositions[i][0] == minSoil[0] &&
                plantPositions[i][1] == minSoil[1]
            ) {
                alreadyPlanted = true;
                break;
            }
        }
        if (alreadyPlanted) {
            var plantX = 3;
            var plantY = 40;
            plantX = 3 + minSoil[0] * 6;
            plantY = 40 - minSoil[0] * 7;
            plantX += 6 * minSoil[1];
            plantY += 7 * minSoil[1];
            var index=0;
            for(let i=0;i<plants.length;i++){
                if(plants[i].props.style.left==(plantX + 2.5 + "%") && plants[i].props.style.top==(plantY-5+"%")){
                    index=i;
                    break;
                }
            }
            cropsPlaced.splice(cropsPlaced.indexOf(plants[index].props.cropName),1);
            plants.splice(index,1);
            var index2=0;
            for(let i=0;i<plantPositions.length;i++){
                if(plantPositions[i][0]==minSoil[0] && plantPositions[i][1]==minSoil[1]){
                    index2=i;
                    break;
                }
            }
           
            plantPositions.splice(index2,1);
        } else {
            var plantX = 3;
            var plantY = 40;
            plantX = 3 + minSoil[0] * 6;
            plantY = 40 - minSoil[0] * 7;
            plantX += 6 * minSoil[1];
            plantY += 7 * minSoil[1];
            plants.push(
                <img
                    className="gardenFood"
                    cropName={this.state.cropSelected} 
                    src={require("./asset/"+this.state.cropSelected+".png")}
                    style={{
                        width: "100px",
                        height: "100px",
                        position: "absolute",
                        left: plantX + 2.5 + "%",
                        top: plantY - 5 + "%",
                    }}
                />
            );
            plantPositions.push(minSoil);
            cropsPlaced.push(this.state.cropSelected);
        }
        this.setState({ plants, plantPositions,cropsPlaced});
    }
    activateEditing(){
        this.setState({ editingStyle:{color: "white",backgroundColor: "#346beb",border:"2px solid transparent",opacity:"1"},managingStyle:{color: "#346beb",backgroundColor: "transparent",border:"2px solid #346beb",opacity:"0"},});
    }
    activateManaging(){
        this.setState({ editingStyle:{color: "#346beb",backgroundColor: "transparent",border:"2px solid #346beb",opacity:"0"},managingStyle:{color: "white",backgroundColor: "#346beb",border:"2px solid transparent",opacity:"1"},});

		var cropsPlaced = this.state.cropsPlaced;
		var counts = {};
		for (var i = 0; i < cropsPlaced.length; i++) {
			var cropType = cropsPlaced[i];
			if (!(cropType in counts))
				counts[cropType] = cropsPlaced.filter((v) => (v === cropType)).length;
		}
		
		var amounts = {};
		var times = {};
        var predictor = require("./predictor.js");
        predictor.initialize(() => {
            for (var i = 0; i < Object.keys(counts).length; i++) {
                var cropType = Object.keys(counts)[i];
                var cropCount = counts[cropType];  
                var answer=predictor.predict(cropType, 0);
                var cropTime = answer.time;
                times[cropType] = [cropTime - Math.round(Math.random()*10+5), cropTime + Math.round(Math.random()*10+5)];
                    
                var minAmount = Math.round(answer.amount.min * cropCount * 10) / 10;
				var maxAmount = Math.round(answer.amount.max * cropCount * 10) / 10;
                amounts[cropType] = Math.round(((minAmount+maxAmount)/2)*10)/10;	
            }
        
            var already=[];
            var cropPredictions=[];
            var cropMarkers=[];
            var cropColors={"Honeydew": "d9df95", "Kale": "a8c470", "Raspberry": "e88e8e", "Peach": "852227", "Cauliflower": "e2d9c1", "Zucchini": "427a15", "Tomatillo": "6c826d", "Squash": "f4981d", "Potato": "835420", "Bell Pepper": "fe352b", "Carrot": "c33f00", "Parsley": "e3ffe3", "Blueberry": "424e7e", "Pineapple": "ffba38", "Watercress": "808080", "Celery": "94c132", "Artichoke": "3d6038", "Cantaloupe": "be7e3b", "Green Bean": "ffffdb", "Mango": "fcd62d", "Mint": "5caa57", "Onion": "c37f43", "Tomato": "f73d4a", "Asparagus": "729d58", "Watermelon": "90110b", "Cherry": "ad0c00", "Grapes": "94ff63", "Pomegranate": "f40022", "Cilantro": "e3ffe3", "Green Onion": "fffff4", "Rhubarb": "7c995c", "soil": "444440", "Garlic": "ffffc6", "Pear": "cacc13", "Peas": "2b402b", "Brussels": "abc756", "Lima Beans": "e0d4ba", "Cucumber": "7aac2f", "Eggplant": "4d227e", "Spinach": "ffffe6", "Collard Greens": "444b29", "Cabbage": "87e3cc", "Beetroot": "fc4c61", "Strawberry": "f63937", "Lettuce": "8bb164", "Sweet Corn": "d9c53e", "Pumpkin": "b74722", "Radish": "83191b", "Kiwi": "d69f38", "Turnip": "ceba95", "Broccoli": "119e4b"};
            var counter=0;
            for(let i=0;i<this.state.cropsPlaced.length;i++){
                if(!already.includes(this.state.cropsPlaced[i])){
                    var text="white";
                    if(this.getBrightness(cropColors[this.state.cropsPlaced[i]])>185){
                        text="black";
                    }
                    cropPredictions.push(<CropPrediction left="81%" top={(10+counter*17)+"%"} backgroundColor={"#"+cropColors[this.state.cropsPlaced[i]]} cropName={this.state.cropsPlaced[i]} cropPrediction={amounts[this.state.cropsPlaced[i]]} text={text}/>);
                    counter++;
                    var time=times[this.state.cropsPlaced[i]];
                    var min=30;
                    var max=150;
                    var width=((time[1]-time[0])/(max-min))*100;
                    var left=((time[0]-min)/(max-min))*100;
                    cropMarkers.push(<CropMarker left={left+"%"} height="10%" top={(3+counter*17)+"%"} width={width+"%"} backgroundColor={"#"+cropColors[this.state.cropsPlaced[i]]+"66"} border={"4px solid "+"#"+cropColors[this.state.cropsPlaced[i]]}/>);
                    
                    already.push(this.state.cropsPlaced[i]);
                }
            }

            this.setState({cropPredictions,cropMarkers});
        });
    }
    getBrightness(hexColor) {
        hexColor = hexColor.replace("#", "");
        var r = parseInt(hexColor.substring(0, 2), 16);
        var g = parseInt(hexColor.substring(2, 4), 16);
        var b = parseInt(hexColor.substring(4, 6), 16);
        return ((r * 299) + (g * 587) + (b * 114)) / 1000;
      }
    render() {
        return (
            <>
              
               
                
               <div style={{position:"absolute",height:"100%",width:"100%",overflowY:"scroll",opacity:this.state.managingStyle.opacity,transition:"0.1s all"}}> <Timeline cropMarkers={this.state.cropMarkers}></Timeline> {this.state.cropPredictions}</div>
                <div style={{position:"absolute",height:"100%",width:"100%",overflowY:"scroll",opacity:this.state.editingStyle.opacity,transition:"0.1s all"}}>{this.state.cropSelects}<div style={{position:"absolute",top:"4400px",width:"100%",height:"100px",backgroundColor:"transparent"}}></div></div>
                <button onClick={this.activateEditing} className="div button"
                    style={{
                        width: "200px",
                        height: "40px",
                        left: "52%",
                        top: "3%",
                        fontSize: "20px",
                        color: this.state.editingStyle.color,
                        backgroundColor: this.state.editingStyle.backgroundColor,
                        borderRadius: "5px 0px 0px 5px",
                        border:this.state.editingStyle.border,
                    }}
                >
                    <b>Edit Garden</b>
                </button>
                <button onClick={this.activateManaging} className="div button"
                    style={{
                        width: "200px",
                        height: "40px",
                        left: "62.4%",
                        top: "3%",
                        fontSize: "20px",
                        color: this.state.managingStyle.color,
                        backgroundColor: this.state.managingStyle.backgroundColor,
                        borderRadius: "0px 5px 5px 0px",

                        border:this.state.managingStyle.border,
                    }}
                >
                    <b>Manage Garden</b>
                </button>
                <Link to="/" className="div" style={{position:"absolute",fontSize:"50px",left:"5%",top:"3%",color:"black"}}>garden.ai</Link>
                
                <div onClick={this.placeFruit}>{this.state.soilBlocks}</div>

                
                <div>{this.state.plants}</div>
                <div style={{position:"absolute",width:"2px",height:"100%",left:"75%",top:"0%",backgroundColor:"rgba(0,0,0,0.2)"}}></div>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"white",position:"absolute",width:"25%",height:"8%",left:"75.1%",top:"0%",textAlign:"center",fontSize:"45px"}}>{this.state.editingStyle.opacity=="1"?"Select A Plant":"Plant Yields"}</div>
            </>
        );
    }
}
class Catalogue extends React.Component{
    constructor(props){
        super(props);
        var crops=[
            "Tomato",
            "Carrot",
            "Lettuce",
            "Cucumber",
            "Spinach",
            "Bell Pepper",
            "Broccoli",
            "Cabbage",
            "Onion",
            "Strawberry",
            "Potato",
            "Zucchini",
            "Green Bean",
            "Radish",
            "Watermelon",
            "Pumpkin",
            "Sweet Corn",
            "Cauliflower",
            "Eggplant",
            "Cilantro",
            "Cantaloupe",
            "Garlic",
            "Kale",
            "Peas",
            "Beetroot",
            "Raspberry",
            "Blueberry",
            "Mint",
            "Parsley",
            "Cherry",
            "Grapes",
            "Squash",
            "Artichoke",
            "Asparagus",
            "Brussels",
            "Celery",
            "Collard Greens",
            "Green Onion",
            "Honeydew",
            "Kiwi",
            "Lima Beans",
            "Mango",
            "Peach",
            "Pear",
            "Pineapple",
            "Pomegranate",
            "Rhubarb",
            "Tomatillo",
            "Turnip",
            "Watercress",
        ];
        crops.sort();
        var cropColors={"Honeydew": "d9df95", "Kale": "a8c470", "Raspberry": "e88e8e", "Peach": "852227", "Cauliflower": "e2d9c1", "Zucchini": "427a15", "Tomatillo": "6c826d", "Squash": "f4981d", "Potato": "835420", "Bell Pepper": "fe352b", "Carrot": "c33f00", "Parsley": "e3ffe3", "Blueberry": "424e7e", "Pineapple": "ffba38", "Watercress": "808080", "Celery": "94c132", "Artichoke": "3d6038", "Cantaloupe": "be7e3b", "Green Bean": "ffffdb", "Mango": "fcd62d", "Mint": "5caa57", "Onion": "c37f43", "Tomato": "f73d4a", "Asparagus": "729d58", "Watermelon": "90110b", "Cherry": "ad0c00", "Grapes": "94ff63", "Pomegranate": "f40022", "Cilantro": "e3ffe3", "Green Onion": "fffff4", "Rhubarb": "7c995c", "soil": "444440", "Garlic": "ffffc6", "Pear": "cacc13", "Peas": "2b402b", "Brussels": "abc756", "Lima Beans": "e0d4ba", "Cucumber": "7aac2f", "Eggplant": "4d227e", "Spinach": "ffffe6", "Collard Greens": "444b29", "Cabbage": "87e3cc", "Beetroot": "fc4c61", "Strawberry": "f63937", "Lettuce": "8bb164", "Sweet Corn": "d9c53e", "Pumpkin": "b74722", "Radish": "83191b", "Kiwi": "d69f38", "Turnip": "ceba95", "Broccoli": "119e4b"};
        
        
        var predictor = require("./predictor.js");
        var catalogCrops=[];
        for(let i=0;i<crops.length;i++){
            catalogCrops.push(<CatalogCrop x={17+23*(i%3)+"%"} y={15+Math.floor(i/3)*25+"%"} item={predictor.getCatalogueEntry(crops[i])} cropName={crops[i]} color={"#"+cropColors[crops[i]]}/>);
        }
        this.state={catalogCrops:catalogCrops};
        
    }
    render(){
        return  <> 
                    <Link to="/" className="div" style={{position:"absolute",fontSize:"50px",left:"5%",top:"3%",color:"black",fontFamily:" 'Open Sans', sans-serif"}}>garden.ai</Link>
                <Link
                    className="div button thing"
                    to="/catalogue"
                    style={{
                        width: "200px",
                        height: "50px",
                        left: "85%",
                        top: "5%",
                        fontSize: "20px",
                        color: "white",
                        backgroundColor: "rgba(0, 206, 10, 1)",
                        borderRadius: "5px",
                    }}
                >
                    <b>Plant Catalogue</b>
                </Link>
                <Link
                    className="div button thing"
                    to="/garden"
                    style={{
                        width: "120px",
                        height: "50px",
                        left: "77%",
                        top: "5%",
                        fontSize: "20px",
                        color: "white",
                        backgroundColor: "#00affa",
                        borderRadius: "5px",
                    }}
                >
                    <b>Garden</b>
                </Link>
                    {this.state.catalogCrops}
                </>
    }
}
class CatalogCrop extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return  <>
                
                
                
                <div style={{position:"absolute",left:this.props.x,top:this.props.y,width:"20%",height:"20%",border:"2px solid rgba(0,0,0,0.1)",borderRadius:"10px",overflow:"hidden"}}>
                    <img width="100px" height="100px" src={require("./asset/"+this.props.cropName+".png")} style={{position:"absolute",left:"10%",top:"15%"}}/>
                    <div className="div" style={{width:"200px",left:"-1%",top:"75%",fontSize:"27px",lineSpacing:"50px"}}>{this.props.cropName}</div>
                    <div className="div" style={{width:"280px",left:"30%",top:"5%",fontSize:"22px"}}>🌡️: {this.props.item.temperature} °C</div>
                    <div className="div" style={{width:"280px",left:"30%",top:"23.75%",fontSize:"22px"}}>♨️: {this.props.item.humidity}%</div>
                    <div className="div" style={{width:"280px",left:"30%",top:"42.5%",fontSize:"22px"}}>📏: {this.props.item.height} CM</div>
                    <div className="div" style={{width:"280px",left:"30%",top:"61.25%",fontSize:"22px"}}>💧: {Math.round(this.props.item.water*10)/10} L/WK</div>
                    <div className="div" style={{width:"280px",left:"30%",top:"80%",fontSize:"22px"}}>🌵: {this.props.item.droughtTolerance}</div>
                </div>
                
                </>
    }
}
class CropPrediction extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return  <>
                    <div style={{position:"absolute",left:this.props.left,top:this.props.top,width:"15%",height:"15%",backgroundColor:this.props.backgroundColor,borderRadius:"5px"}}>
                        <img style={{backgroundColor:"white",position:"absolute",width:"100px",height:"100px",left:"7%",top:"10%",borderRadius:"10px"}}src={require("./asset/"+this.props.cropName+".png")}/>
                        <div className="div" style={{width:"100px",left:"7%",fontSize:"20px",color:"white",top:"80%"}}><b>{this.props.cropName}</b></div>
                        <div className="div" style={{width:"60%",left:"40%",fontSize:"50px",color:"white",top:"20%",fontFamily:"'Open Sans', sans-serif"}}><b>{this.props.cropPrediction}</b></div>
                        <div style={{position:"absolute",left:"63%",fontSize:"30px",color:"white",top:"60%",fontFamily:"'Open Sans', sans-serif"}}><b>KG</b></div>
                    </div>
                </>
    }
}
class FallingFruit extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <img
                    className="fallingFruit"
                    src={require("./asset/" + this.props.image)}
                    style={{
                        left: this.props.left,
                        animation:
                            "fall " +
                            this.props.fallDuration +
                            " linear "+this.props.delay+" infinite",
                        transform:"rotate("+this.props.spinDuration+"deg)",
                    }}
                />
            </>
        );
    }
}
class SoilBlock extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <img
                    src={require("./asset/soil.png")}
                    style={{
                        position: "absolute",
                        left: this.props.left,
                        top: this.props.top,
                        width: this.props.width,
                        height: this.props.height,
                        filter: "contrast(60%)",
                        
                    }}
                />
            </>
        );
    }
}

class CropSelector extends React.Component {
    constructor(props) {
        super(props);
        this.selectCrop=this.selectCrop.bind(this);
    }
    selectCrop(event){
        this.props.onClick(event,this.props.cropName);
    }
    render() {
            return <>
                
                <img
                    src={require("./asset/" + this.props.cropName+".png")}
                    style={{
                        position: "absolute",
                        left: this.props.left,
                        top: "calc("+this.props.top+" + 10px)",
                        width: this.props.width,
                        height: this.props.height,
                    }}
                />
                <h1 style = {{
                    position:"absolute",
                    left:"calc("+this.props.left+" - "+this.props.width+" / 2)",
                    top:"calc("+this.props.top+" + 90px)",
                    textAlign:"center",
                    width:"calc("+this.props.width+" * 2)",
                    fontFamily: "'Open Sans', sans-serif",
                    color:"rgba(0,0,0,1)",
                    fontSize:"25px",
                }}>{this.props.cropName}</h1>
                <div onClick={this.selectCrop} style={{position:"absolute", left:"calc("+this.props.left+" - "+this.props.width+" / 2)",top:"calc("+this.props.top+" + 0px)",width:"calc("+this.props.width+" * 2)",height:"calc("+this.props.height+" * 1.5)",border:this.props.border,borderRadius:"30px"}}></div>
            </>
    
    }
}

class Timeline extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return  <>
                    <div style={{position:"absolute",fontSize:"30px",left:"78%",top:"80%"}}>Harvest Timeline</div>
                    <div style={{position:"absolute",width:"2px",height:"20px",left:"78.5%",top:"94.5%",backgroundColor:"rgba(0,0,0,1)"}}></div>
                    <div style={{position:"absolute",width:"2px",height:"20px",left:"78%",top:"96.5%",color:"rgba(0,0,0,1)",fontSize:"15px"}}>30D</div>
                    <div style={{position:"absolute",width:"2px",height:"20px",left:"88%",top:"94.5%",backgroundColor:"rgba(0,0,0,1)"}}></div>
                    <div style={{position:"absolute",width:"2px",height:"20px",left:"87.5%",top:"96.5%",color:"rgba(0,0,0,1)",fontSize:"15px"}}>90D</div>
                    <div style={{position:"absolute",width:"2px",height:"20px",left:"97.5%",top:"94.5%",backgroundColor:"rgba(0,0,0,1)"}}></div>
                    <div style={{position:"absolute",width:"2px",height:"20px",left:"96.5%",top:"96.5%",color:"rgba(0,0,0,1)",fontSize:"15px"}}>150D</div>
                    <div style={{position:"absolute",border:"2px solid rgba(0,0,0,0.2)",width:"20%",height:"10%",left:"78%",top:"85%",borderRadius:"5px"}}>
                        {this.props.cropMarkers}
                    </div>                               
                </>
    }
}

class CropMarker extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return  <>
                    <div style={{position:"absolute",left:this.props.left,top:this.props.top,height:this.props.height,width:this.props.width,backgroundColor:this.props.backgroundColor,borderLeft:this.props.border,borderRight:this.props.border}}></div>
                </>
    }
}



export { Home, Garden, Catalogue };

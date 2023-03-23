import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect,useState,useCallback } from 'react';



const AvailableMeals = () => {
  const [mealsList,setMealsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMeals = useCallback(async () =>{
    setIsLoading(true);
    setError(null);
    try{
        const response = await fetch('https://food-app-d3182-default-rtdb.firebaseio.com/meals.json');
  
        if(!response.ok){
            throw new Error('Something went wrong!')
        }
        const data = await response.json();
         
        const loadedMeals = [];
  
       if(data){
        for(const key in data){
          loadedMeals.push({
                id:key,
                description:data[key].description,
                name:data[key].name,
                price:data[key].price,
            });
        }
        setMealsList(loadedMeals); 
       }
                  
    } catch (error){
       setError(error.message);
    }
    setIsLoading(false);        
  }, []);
  
  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);


  const mealData = mealsList.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      {isLoading ?                     
          <h2 style={{color:'#fff',textAlign:'center',fontSize:'30px'}}>Loading...</h2> : 
          <Card>
              <p>{error}</p>
            <ul>{mealData}</ul>
          </Card>
      }
    </section>
  );
};

export default AvailableMeals;

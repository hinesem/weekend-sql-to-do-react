import { useState } from 'react';


function CreatureList() {
    const [listOfCreatures, setListOfCreatures] = useState([
        {
            name: 'Unicorn',
            origin: 'Norway'
        }
    ]);
    //all components return what you want them to display
    return (
        <div>
            <h2>Creature List</h2>
            <ul>
                {listOfCreatures.map((creature) =>
                <li>{creature.name} from {creature.origin}</li>)}
            </ul>
        </div>
    );
}

//all components must export
export default CreatureList;
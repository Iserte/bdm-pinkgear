import React, {useState, useEffect} from 'react';
import NumberFormat from 'react-number-format';
import './App.css';

interface Fragments {
  kzarka: number;
  dandelion: number;
  nouver: number;
  redNose: number;
  giath: number;
  bheg: number;
  muskan: number;
}

interface TotalPrice {
  weapons: number;
  armors: number;
}

function App() {
  const [fragments, setFragments] = useState<Fragments>({
    kzarka: 0,
    dandelion: 0,
    nouver: 0,
    redNose: 0,
    giath: 0,
    bheg: 0,
    muskan: 0
  });
  const [missing, setMissing] = useState<Fragments>({
    kzarka: 0,
    dandelion: 0,
    nouver: 0,
    redNose: 0,
    giath: 0,
    bheg: 0,
    muskan: 0
  });
  const [price, setPrice] = useState<Fragments>({
    kzarka: 0,
    dandelion: 0,
    nouver: 0,
    redNose: 0,
    giath: 0,
    bheg: 0,
    muskan: 0
  });
  const [totalPrice, setTotalPrice] = useState<TotalPrice>({
    weapons: 0,
    armors: 0
  })

  useEffect(() => {
    const fragmentsStorage = localStorage.getItem("fragments");
    if (!fragmentsStorage) return;
    return setFragments(JSON.parse(fragmentsStorage));
  }, [])

  useEffect(() => {
    localStorage.setItem("fragments", JSON.stringify(fragments));
    setMissing({
      kzarka: 900 - fragments.kzarka,
      dandelion: 900 - fragments.dandelion,
      nouver: 900 - fragments.nouver,
      redNose: 240 - fragments.redNose,
      giath: 240 - fragments.giath,
      bheg: 240 - fragments.bheg,
      muskan: 240 - fragments.muskan
    })
  },[fragments])

  useEffect(() => {
    setPrice({
      kzarka: missing.kzarka * 920,
      dandelion: missing.dandelion * 920,
      nouver: missing.nouver * 920,
      redNose: missing.redNose * 1360,
      giath: missing.giath * 1200,
      bheg: missing.bheg * 1040,
      muskan: missing.muskan * 1040
    })
  },[missing])

  useEffect(() => {
    setTotalPrice({
      weapons: price.kzarka + price.dandelion + price.nouver,
      armors: price.redNose + price.giath + price.bheg + price.muskan
    })
  },[price])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let {name, value} = e.target

    if (
      ['kzarka', 'dandelion', 'nouver']
        .includes(name)
        && value as unknown as number > 900
      ) value = '900';

    if (
      ['redNose', 'giath', 'bheg', 'muskan']
        .includes(name) 
      && value as unknown as number > 240
    ) value = '240';

    if (
      ['kzarka', 'dandelion', 'nouver', 'redNose', 'giath', 'bheg', 'muskan']
        .includes(name) 
      && value as unknown as number < 0
    ) value = '0';
    
    setFragments({
      ...fragments,
      [name]: value
    })
  }

  return (
    <div className="App">
      {/* WEAPONS */}
      <table>
        <tr>
          <th className="center" colSpan={4}>Weapons</th>
        </tr>
        <tr>
          <th>Name</th>
          <td>Kzarka</td>
          <td>Dandelion</td>
          <td>Nouver</td>
        </tr>
        <tr>
          <th>Required</th>
          <td>900</td>
          <td>900</td>
          <td>900</td>
        </tr>
        <tr style={{background: "#88CC88"}}>
          <th>Owned</th>
          <td><input onChange={handleChange} value={fragments.kzarka} min="0" max="900" type="number" name="kzarka" id="kzarka"/></td>
          <td><input onChange={handleChange} value={fragments.dandelion} min="0" max="900" type="number" name="dandelion" id="dandelion"/></td>
          <td><input onChange={handleChange} value={fragments.nouver} min="0" max="900" type="number" name="nouver" id="nouver"/></td>
        </tr>
        <tr>
          <th>Missing</th>
          <td>{missing.kzarka}</td>
          <td>{missing.dandelion}</td>
          <td>{missing.nouver}</td>
        </tr>
        <tr>
          <th>Price</th>
          <td><NumberFormat thousandSeparator={true} displayType="text" value={price.kzarka} /></td>
          <td><NumberFormat thousandSeparator={true} displayType="text" value={price.dandelion} /></td>
          <td><NumberFormat thousandSeparator={true} displayType="text" value={price.nouver} /></td>
        </tr>
        <tr>
          <th>Total Price</th>
          <th className="center" colSpan={3}><NumberFormat thousandSeparator={true} displayType="text" value={totalPrice.weapons} /></th>
        </tr>
      </table>

      {/* ARMORS */}
      <table>
        <tr>
          <th className="center" colSpan={5}>Armors</th>
        </tr>
        <tr>
          <th>Name</th>
          <td>Red Nose</td>
          <td>Giath</td>
          <td>Bheg</td>
          <td>Muskan</td>
        </tr>
        <tr>
          <th>Required</th>
          <td>240</td>
          <td>240</td>
          <td>240</td>
          <td>240</td>
        </tr>
        <tr style={{background: "#88CC88"}}>
          <th>Owned</th>
          <td><input onChange={handleChange} value={fragments.redNose} min="0" max="240" type="number" name="redNose" id="redNose"/></td>
          <td><input onChange={handleChange} value={fragments.giath} min="0" max="240" type="number" name="giath" id="giath"/></td>
          <td><input onChange={handleChange} value={fragments.bheg} min="0" max="240" type="number" name="bheg" id="bheg"/></td>
          <td><input onChange={handleChange} value={fragments.muskan} min="0" max="240" type="number" name="muskan" id="muskan"/></td>
        </tr>
        <tr>
          <th>Missing</th>
          <td>{missing.redNose}</td>
          <td>{missing.giath}</td>
          <td>{missing.bheg}</td>
          <td>{missing.muskan}</td>
        </tr>
        <tr>
          <th>Price</th>
          <td><NumberFormat thousandSeparator={true} displayType="text" value={price.redNose} /></td>
          <td><NumberFormat thousandSeparator={true} displayType="text" value={price.giath} /></td>
          <td><NumberFormat thousandSeparator={true} displayType="text" value={price.bheg} /></td>
          <td><NumberFormat thousandSeparator={true} displayType="text" value={price.muskan} /></td>
        </tr>
        <tr>
          <th>Total Price</th>
          <th className="center" colSpan={4}><NumberFormat thousandSeparator={true} displayType="text" value={totalPrice.armors} /></th>
        </tr>
      </table>
    </div>
  );
}

export default App;

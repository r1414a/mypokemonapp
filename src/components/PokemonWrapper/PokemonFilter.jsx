import { useState, useMemo, useContext } from "react";

import { PokemonContext } from "../../contextAPI/pokemonContextAPI";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
      backgroundColor: '#141414',
      color: '#ffffff'
    },
  },
};

function getStyles(type, selectedType, theme) {
  return {
    fontWeight: selectedType.includes(type)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}


export default function PokemonFilter() {
  const { pokemonList, setFilteredPokemon, setPokemonList,showFilterOptions } =
    useContext(PokemonContext);
    const theme = useTheme();
  const [selectedType, setSelectedType] = useState([]);

  const uniqueTypes = useMemo(() => {
    const filterSet = new Set();
    pokemonList.map((pokemon) =>
      pokemon.types.map((pokemonType) => {
        console.log("doing mapping");
        filterSet.add(pokemonType.type.name);
      })
    );

    return [...filterSet];
  }, [pokemonList]);

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setSelectedType(
      typeof value === 'string' ? value.split(',') : value,
    );
    setFilteredPokemon(
      pokemonList.filter((pokemon) => {
        return pokemon.types.some(
          (typeInfo) => value.includes(typeInfo.type.name)
        );
      })
    );
  };

  const clearFilter = () => {
    setSelectedType([]);
    setFilteredPokemon(pokemonList);
  };

  return (
    <div
      className={`overflow-hidden transition-all duration-700 ease-in-out flex px-4 justify-center items-center ${
  showFilterOptions ? "max-h-20 mt-10" : "max-h-0 mt-0"
}`}
    >
      <button
        className="bg-yellow-400 text-black px-4 py-3 me-2 rounded-md hover:bg-yellow-300 font-semibold"
        onClick={clearFilter}
        disabled={!selectedType}
      >
        Clear
      </button>


      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel sx={{color: "white",
          '&.Mui-focused': {
      color: 'yellow',
    },
        }} id="demo-multiple-name-label">Select Pokemon Type(s)</InputLabel>
        <Select
        sx={{
          color: "white",
          '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'yellow',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'yellow',
        },
        '.MuiSelect-select' : {
          padding: '14px'
        },
          '.MuiSvgIcon-root' : {
            color: 'white'
          },
        
        }}
          label="Select multiple Type"
          id="demo-multiple-name"
          multiple
          value={selectedType}
          onChange={handleTypeChange}
          input={<OutlinedInput label="Select Pokemon Type(s)" sx={{color: "white", borderColor: "white"}}/>}
          MenuProps={MenuProps}
        >
          {uniqueTypes.map((type) => (
            <MenuItem
              key={type}
              value={type}
              style={getStyles(type, selectedType, theme)}
              sx={{
                '&:hover':{
                  backgroundColor: '#FDC700',
                  color: '#141414'
                }
              }}
            >
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>


      {/* <select
        name="pokemonType"
        id="pokemonType"
        className="bg-gray-800 text-yellow-400 rounded-lg py-3 ps-3 pe-5 mr-2 shadow-xl/20 shadow-yellow-400/50"
        value={selectedType}
        onChange={handleTypeChange}
      >
        <option value="" disabled>
          Select Type
        </option>
        {uniqueTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select> */}
    </div>
  );
}

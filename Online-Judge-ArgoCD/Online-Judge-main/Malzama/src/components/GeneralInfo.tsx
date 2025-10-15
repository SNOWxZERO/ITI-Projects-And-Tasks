import React, { useEffect, useState, useContext } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  InputAdornment,
  SelectChangeEvent,
  MenuItem,
  Autocomplete,
  selectClasses,
} from "@mui/material";
import problemSetInstance, { TagMap } from "../services/Problems";
import { GeneralInfoContext } from "../Context/ProblemContext";
import { TabsContext } from "../Context/TabsContext";
import "../index.css";

interface GeneralInfoFormProps {
  onChange: (isFilled: boolean) => void;
}

const GeneralInfoForm: React.FC<GeneralInfoFormProps> = ({ onChange }) => {
  const [tagMap, setTagMap] = useState<TagMap>({});
  const currentProblem = useContext(GeneralInfoContext);
  const [test, setTest] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const activeTab = React.useContext(TabsContext);
  const [isFilled, setIsFilled] = useState(false);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      const tags = await problemSetInstance.getTags();
      setLoading(true);
      setTagMap(tags);
      setAvailableTags(Object.values(tags));
    };
    fetchTags();
  }, [loading]);

  function getKeysByValues(tagMap: TagMap, values: string[]): number[] {
    return Object.entries(tagMap)
      .filter(([key, value]) => values.includes(value))
      .map(([key]) => parseInt(key));
  }

  const handleTagChange = (event: any, tags: string[]) => {
    const tagsId = getKeysByValues(tagMap, tags);
    currentProblem.setGeneralInfo((prevValues) => ({
      ...prevValues,
      selectedTags: tagsId,
    }));
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    if (name === "timeLimit" || name === "memoryLimit") {
      if (value.match(/^\d+$/)) {
        currentProblem.setGeneralInfo((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      }
    } else {
      currentProblem.setGeneralInfo((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleDifficultyChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    if (value !== undefined) {
      currentProblem.setGeneralInfo((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (
      currentProblem.generalInfo.name.trim() !== "" &&
      currentProblem.generalInfo.difficulty.trim() !== "" &&
      currentProblem.generalInfo.selectedTags.length !== 0 &&
      currentProblem.generalInfo.timeLimit !== 0 &&
      currentProblem.generalInfo.memoryLimit !== 0
    ) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
    onChange(isFilled);
  }, [
    currentProblem.generalInfo.name,
    currentProblem.generalInfo.difficulty,
    currentProblem.generalInfo.selectedTags,
    currentProblem.generalInfo.timeLimit,
    currentProblem.generalInfo.memoryLimit,
    isFilled,
  ]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFilled) {
      activeTab.setValue(1);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "1rem",
      }}
    >
      <FormControl sx={{ mb: 2, width: "50%" }} margin="normal">
        <TextField
          label="Name"
          name="name"
          value={currentProblem.generalInfo.name}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl sx={{ mb: 2, width: "50%" }} margin="normal">
        <InputLabel>Difficulty</InputLabel>
        <Select
          label="Difficulty"
          name="difficulty"
          value={currentProblem.generalInfo.difficulty}
          onChange={handleDifficultyChange}
          required
        >
          <MenuItem value={"1"}>1</MenuItem>
          <MenuItem value={"2"}>2</MenuItem>
          <MenuItem value={"3"}>3</MenuItem>
          <MenuItem value={"4"}>4</MenuItem>
          <MenuItem value={"5"}>5</MenuItem>
          <MenuItem value={"6"}>6</MenuItem>
          <MenuItem value={"7"}>7</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ mb: 2, width: "50%" }} margin="normal">
        <TextField
          label="Time Limit"
          name="timeLimit"
          type="number"
          value={currentProblem.generalInfo.timeLimit || ""}
          InputProps={{
            inputProps: { min: 0 },
            endAdornment: <InputAdornment position="end">MS</InputAdornment>,
          }}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl sx={{ mb: 2, width: "50%" }} margin="normal">
        <TextField
          label="Memory Limit"
          name="memoryLimit"
          type="number"
          value={currentProblem.generalInfo.memoryLimit || ""}
          InputProps={{
            inputProps: { min: 0 },
            endAdornment: <InputAdornment position="end">KB</InputAdornment>,
          }}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl sx={{ mb: 2, width: "50%" }} margin="normal">
        <Autocomplete
          multiple
          options={availableTags}
          getOptionLabel={(option) => option}
          onChange={handleTagChange}
          value={currentProblem.generalInfo.selectedTags.map(
            (key) => tagMap[key]
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Tags"
              placeholder="Type to add tags"
            />
          )}
        />
      </FormControl>
      <button className="submitBtn" type="submit">
        Next
      </button>
    </form>
  );
};

export default GeneralInfoForm;

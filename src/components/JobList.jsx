import { useState } from "react";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FadeInSection from "./FadeInSection";

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const experienceItems = [
  {
    company: "Google",
    jobTitle: "Software Engineer @",
    duration: "JAN 2025 - PRESENT",
    desc: [
      "Built and launched large-scale machine learning-driven conversion autobidding models at Google scale.",
      "Led end-to-end model development for Proxybidder ML systems driving multi-million-dollar revenue impact.",
    ],
  },
  {
    company: "Pinterest",
    jobTitle: "Software Engineer II @",
    duration: "JUL 2022 - JAN 2025",
    desc: [
      "Led generative AI solution using LLMs for advanced prompt engineering.",
      "Designed prompt management UI for 500K+ users with real-time collaboration.",
    ],
  },
  {
    company: "Amazon",
    jobTitle: "Software Development Engineer II @",
    duration: "JUL 2022 - MAY 2024",
    desc: [
      "Led region build automation across Route 53.",
      "Re-built core DNS systems improving UX for millions.",
    ],
  },
];

const JobList = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", height: 400 }}>
      <Tabs
        orientation={isMobile ? "horizontal" : "vertical"}
        variant={isMobile ? "fullWidth" : "scrollable"}
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        sx={{
          borderRight: isMobile ? 0 : 1,
          borderColor: "divider",
          minWidth: 180,
        }}
      >
        {experienceItems.map((item, i) => (
          <Tab
            key={item.company}
            label={isMobile ? `0${i + 1}.` : item.company}
            id={`tab-${i}`}
            aria-controls={`tabpanel-${i}`}
          />
        ))}
      </Tabs>

      {experienceItems.map((item, i) => (
        <TabPanel key={item.company} value={value} index={i}>
          <span className="joblist-job-title">{item.jobTitle} </span>
          <span className="joblist-job-company">{item.company}</span>

          <div className="joblist-duration">{item.duration}</div>

          <ul className="job-description">
            {item.desc.map((descItem, idx) => (
              <FadeInSection key={idx} delay={`${(idx + 1) * 100}ms`}>
                <li>{descItem}</li>
              </FadeInSection>
            ))}
          </ul>
        </TabPanel>
      ))}
    </Box>
  );
};

export default JobList;

import { ChangeEvent, useState } from "react";
import { GetServerSideProps } from "next";
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { Layout } from "@/components/layouts";
import Cookies from 'js-cookie'
import axios from "axios";

interface Props {
  theme: string
}

export default function ThemeChangerPage({theme}:Props) {
  
  const [currentTheme, setCurrenTheme] = useState(theme)

  const onThemeChange = (e:ChangeEvent<HTMLInputElement>) => {

    const selectedTheme = e.target.value

    setCurrenTheme(selectedTheme)
    Cookies.set('theme',selectedTheme)
  }

  const onClicked = async() => {
    const {data} = await axios.get('/api/hello')
  }

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <RadioGroup value={currentTheme} onChange={onThemeChange}>
              <FormControlLabel value='light' control={ <Radio />} label='Light'/>
              <FormControlLabel value='dark' control={ <Radio />} label='Dark'/>
              <FormControlLabel value='custom' control={ <Radio />} label='Custom'/>
            </RadioGroup>
          </FormControl>

          <Button
            onClick={ onClicked }
          >
            Request
          </Button>
        </CardContent>
      </Card>
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({req}) => {

  const { theme = 'light' } = req.cookies;

  const validThemes = ['light', 'dark', 'custom'];



  return {
    props:{
      theme: validThemes.includes(theme) ? theme : 'light'
    }
  }
}
import { CategoryDto } from '../types';

export const DefaultArticleStyle: StyleDto = {
  id: 1,
  layout: "#a99cff",
  textSize: 14,
  impTextHtmlStyle: "bold"
}

export type StyleDto = {
  id: number,
  layout: string,
  textSize: number,
  impTextHtmlStyle: string
}

export type ArticleDto = {
  title: string
  text: string
  chapters: ChapterDto[]
  style: StyleDto
  tags: { name: string }[]
  category: CategoryDto
}

export type PartialArticleDto = {
  title: string
  text: string
}

export type ChapterDto = {
  orderNum: number
  subtitle: string
  text: string
}

export type CredentialsDto = {
  email: string
  password: string
}

export type TokenDto = {
  token: string
}
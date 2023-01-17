import * as yup from 'yup'

export const publishArticleValidation = yup.object().shape({
  title: yup.string().required('Tytuł jest wymagany').min(1, 'Tytuł jest wymagany'),
  text: yup.string().required('Wstęp jest wymagany').min(1, 'Wstęp jest wymagany'),
  category: yup.object().nullable().required('Kategoria jest wymagana'),
  chapters: yup.array().of(yup.object().shape({
    subtitle: yup.string().required('Tytuł rozdziału jest wymagany').min(1, 'Tytuł rozdziału jest wymagany'),
    text: yup.string().required('Treść rozdziału jest wymagana').min(1, 'Treść rozdziału jest wymagana'),
  }))
})
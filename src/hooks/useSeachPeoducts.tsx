import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'

import { schema, type Schema } from 'src/utils/rules'
import useQueryConfig from './useQueryConfig'
import { path } from 'src/contexts/path'

type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])

export default function useSeachPeoducts() {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const handleSearch = handleSubmit((data) => {
    const Config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['sort_by', 'order']
        )
      : {
          ...queryConfig,
          name: data.name
        }

    navigate({
      pathname: path.home,
      search: createSearchParams(Config).toString()
    })
  })
  return { handleSearch, register }
}

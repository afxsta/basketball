import { defineStore, storeToRefs } from 'pinia'
import {
  TeamModel,
  FilterModel,
  ResponseModel,
  useApiStore,
  useMediaStore,
  PaginationModel,
} from '@/entities'
import { ref } from 'vue'

/**
 * * Стор для управления командами
 */
export const useTeamStore = defineStore('team-store', () => {
  /**
   * * Стор для использования API
   */
  const { api, apiUrl } = storeToRefs(useApiStore())
  /**
   * * Стор для управления медиа файлами
   */
  const { saveImage } = useMediaStore()

  /**
   * * Путь к API команд
   */
  const teamApiPath = '/api/Team/'

  /**
   * * Данные для пагинации команд
   */
  const pagination = ref(new PaginationModel())

  /**
   * * Отправка запроса для получения списка команд
   * @param filter Данные для запроса
   * @returns Список команд
   */
  const getTeams = async (filter: FilterModel) =>
    new Promise<ResponseModel<TeamModel[]>>(async (resolve) => {
      const request = {
        params: {
          name: filter?.Name,
          teamIds: filter?.TeamIds,
          page: filter?.Pagination?.Page,
          pageSize: filter?.Pagination?.PageSize,
        },
        paramsSerializer: {
          indexes: true,
        },
      }

      await api.value
        .get(`${teamApiPath}GetTeams`, request)
        .then((response) => {
          pagination.value = new PaginationModel({
            Count: response?.data?.count,
            Page: response?.data?.page,
            PageSize: response?.data?.size,
          })
          resolve(
            new ResponseModel({
              Value: response?.data?.data?.map((x: any) => mapTeam(x)) || [],
            })
          )
        })
        .catch((error) => {
          console.error(error)
          resolve(new ResponseModel({ IsSuccess: false }))
        })
    })

  /**
   * * Запрос на создание команды
   * @param team Данные о команде
   * @returns Новая команда
   */
  const updateTeam = async (team: TeamModel) =>
    new Promise<ResponseModel<TeamModel>>(async (resolve, reject) => {
      if (team.Image instanceof File) {
        const mediaResponse = await saveImage(team.Image)
        if (mediaResponse.IsSuccess) {
          team.Image = mediaResponse.Value
        } else {
          return resolve(new ResponseModel({ IsSuccess: false }))
        }
      }

      const request = {
        id: team?.Id,
        name: team?.Name,
        foundationYear: Number(team?.FoundationYear),
        division: team?.Division,
        conference: team?.Conference,
        imageUrl: team?.Image?.replaceAll(apiUrl.value, ''),
      }

      const query = team?.Id
        ? api.value.put(`${teamApiPath}Update`, request)
        : api.value.post(`${teamApiPath}Add`, request)

      await query
        .then((response) => {
          resolve(new ResponseModel({ Value: mapTeam(response.data) }))
        })
        .catch((error) => {
          console.error(error)
          resolve(new ResponseModel({ IsSuccess: false }))
        })
    })

  /**
   * * Запрос для получения команды
   * @param id Id команды
   * @returns Данные о команде
   */
  const getTeam = async (id: number) =>
    new Promise<ResponseModel<TeamModel>>(async (resolve, reject) => {
      await api.value
        .get(`${teamApiPath}Get`, { params: { id } })
        .then((response) => {
          const result = new ResponseModel<TeamModel>()
          if (!response.data) {
            result.IsSuccess = false
            return resolve(result)
          } else {
            result.Value = mapTeam(response.data)
          }
          resolve(result)
        })
        .catch((error) => {
          console.error(error)
          resolve(new ResponseModel({ IsSuccess: false }))
        })
    })

  /**
   * * Получение модели команды из ответа
   */
  const mapTeam = (response: any) => {
    let _image = ''
    if (response.avatarUrl) {
      _image = response.avatarUrl.includes(apiUrl.value)
        ? response
        : apiUrl.value + response.avatarUrl
    }

    return new TeamModel({
      Id: response.id,
      Name: response.name,
      Image: _image,
      Conference: response.conference,
      Division: response.division,
      FoundationYear: response.foundationYear,
    })
  }

  /**
   * * Запрос на удаление игрока
   * @param id Id удаляемого игрока
   */
  const deleteTeam = async (id: number) =>
    new Promise<ResponseModel<boolean>>(async (resolve) => {
      await api.value
        .delete(`${teamApiPath}Delete`, { params: { id } })
        .then(() => {
          resolve(new ResponseModel({ Value: true }))
        })
        .catch((error) => {
          console.error(error)
          resolve(new ResponseModel({ IsSuccess: false }))
        })
    })

  return {
    /**
     * * Отправка запроса для получения списка команд
     * @param filter Данные для запроса
     * @returns Список команд
     */
    getTeams,
    /**
     * * Запрос на создание/редактирование команды
     * @param team Данные о команде
     * @returns Новая команда
     */
    updateTeam,
    /**
     * * Запрос для получения команды
     * @param id Id команды
     * @returns Данные о команде
     */
    getTeam,
    /**
     * * Запрос на удаление игрока
     * @param id Id удаляемого игрока
     */
    deleteTeam,
    /**
     * * Данные для пагинации команд
     */
    pagination,
  }
})

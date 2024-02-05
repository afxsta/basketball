import { defineStore, storeToRefs } from 'pinia'
import {
  TeamModel,
  FilterModel,
  ResponseModel,
  useApiStore,
  useMediaStore,
  PaginationModel,
} from '@/entities'
import { computed, ref } from 'vue'
import { SelectOptionModel } from '@/shared'

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
          console.log(error)
          resolve(new ResponseModel({ IsSuccess: false }))
        })
    })

  /**
   * * Запрос на создание команды
   * @param team Данные о команде
   * @returns Новая команда
   */
  const addTeam = async (team: TeamModel) =>
    new Promise<ResponseModel<TeamModel>>(async (resolve, reject) => {
      if (team.Image instanceof File) {
        const mediaResponse = await saveImage(team.Image)
        if (mediaResponse.IsSuccess) {
          team.Image = mediaResponse.Value
        } else {
          return resolve(null)
        }
      }

      const request = {
        name: team?.Name,
        foundationYear: Number(team?.FoundationYear),
        division: team?.Division,
        conference: team?.Conference,
        imageUrl: team?.Image,
      }

      await api.value
        .post(`${teamApiPath}Add`, request)
        .then((response) => {
          console.log(response?.data?.data)
          resolve(new ResponseModel({ Value: team }))
        })
        .catch((error) => {
          console.log(error)
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
          resolve(new ResponseModel({ Value: mapTeam(response.data) }))
        })
        .catch((error) => {
          console.log(error)
          resolve(new ResponseModel({ IsSuccess: false }))
        })
    })

  /**
   * * Получение модели команды из ответа
   */
  const mapTeam = (response: any) => {
    return new TeamModel({
      Id: response.id,
      Name: response.name,
      Image: response.imageUrl ? apiUrl.value + response.imageUrl : '',
      Conference: response.conference,
      Division: response.division,
      FoundationYear: response.foundationYear,
    })
  }

  return {
    /**
     * * Отправка запроса для получения списка команд
     * @param filter Данные для запроса
     * @returns Список команд
     */
    getTeams,
    /**
     * * Запрос на создание команды
     * @param team Данные о команде
     * @returns Новая команда
     */
    addTeam,
    /**
     * * Запрос для получения команды
     * @param id Id команды
     * @returns Данные о команде
     */
    getTeam,
    /**
     * * Данные для пагинации команд
     */
    pagination,
  }
})

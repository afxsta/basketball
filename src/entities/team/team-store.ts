import { defineStore, storeToRefs } from 'pinia'
import { TeamModel, FilterModel, ResponseModel, useApiStore } from '@/entities'
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
   * * Список команд
   */
  const teams = ref<TeamModel[]>([])

  /**
   * * Путь к API команд
   */
  const teamApiPath = '/api/Team/'

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
          console.log(response?.data?.data)
          teams.value =
            response?.data?.data?.map(
              (x: any) =>
                new TeamModel({
                  Id: x.id,
                  Name: x.name,
                  Image: apiUrl.value + x.imageUrl,
                  Conference: x.conference,
                  Division: x.division,
                  FoundationYear: x.foundationYear,
                })
            ) || []
          resolve(new ResponseModel({ Value: [] }))
        })
        .catch((error) => {
          console.log(error)
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
     * * Список команд
     */
    teams,
  }
})

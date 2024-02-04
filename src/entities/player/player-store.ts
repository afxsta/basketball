import { defineStore, storeToRefs } from 'pinia'
import {
  PlayerModel,
  FilterModel,
  ResponseModel,
  useApiStore,
} from '@/entities'
import { ref } from 'vue'

/**
 * * Стор для управления игроками
 */
export const usePlayerStore = defineStore('player-store', () => {
  /**
   * * Стор для использования API
   */
  const { api, apiUrl } = storeToRefs(useApiStore())

  /**
   * * Список игроков
   */
  const players = ref<PlayerModel[]>([])

  /**
   * * Путь к API игроков
   */
  const playerApiPath = '/api/Player/'

  /**
   * * Отправка запроса для получения списка игроков
   * @param filter Данные для запроса
   * @returns Список игроков
   */
  const getPlayers = async (filter: FilterModel) =>
    new Promise<ResponseModel<PlayerModel[]>>(async (resolve) => {
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
        .get(`${playerApiPath}GetPlayers`, request)
        .then((response) => {
          players.value =
            response?.data?.data?.map(
              (x: any) =>
                new PlayerModel({
                  Id: x.id,
                  Name: x.name,
                  Number: x.number,
                  Position: x.position,
                  Team: x.team,
                  Birthday: x.birthday,
                  Height: x.height,
                  Weight: x.weight,
                  Image: apiUrl.value + x.avatarUrl,
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
     * * Отправка запроса для получения списка игроков
     * @param filter Данные для запроса
     * @returns Список игроков
     */
    getPlayers,
    /**
     * * Список игроков
     */
    players,
  }
})

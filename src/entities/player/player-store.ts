import { defineStore, storeToRefs } from 'pinia'
import {
  PlayerModel,
  FilterModel,
  ResponseModel,
  useApiStore,
  useMediaStore,
} from '@/entities'
import { computed, ref } from 'vue'
import { SelectOptionModel } from '@/shared'

/**
 * * Стор для управления игроками
 */
export const usePlayerStore = defineStore('player-store', () => {
  /**
   * * Стор для использования API
   */
  const { api, apiUrl } = storeToRefs(useApiStore())
  /**
   * * Стор для управления медиа файлами
   */
  const { saveImage } = useMediaStore()
  /**
   * * Путь к API игроков
   */
  const playerApiPath = '/api/Player/'

  /**
   * * Список игроков
   */
  const players = ref<PlayerModel[]>([])
  /**
   * * Позиции игроков
   */
  const positions = ref<string[]>([])

  /**
   * * Список позиций для select компонента
   */
  const optionsPosition = computed(() =>
    positions.value?.map(
      (position, index) =>
        new SelectOptionModel({
          Text: position,
          Id: index,
        })
    )
  )

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
            response?.data?.data?.map((x: any) => mapPlayer(x)) || []
          resolve(new ResponseModel({ Value: [] }))
        })
        .catch((error) => {
          console.log(error)
          resolve(new ResponseModel({ IsSuccess: false }))
        })
    })

  /**
   * * Запрос на добавление нового игрока
   * @param player Данные об игроке
   * @returns Новый игрок
   */
  const add = async (player: PlayerModel) =>
    new Promise<ResponseModel<PlayerModel[]>>(async (resolve) => {
      if (player.Image instanceof File) {
        const mediaResponse = await saveImage(player.Image)
        if (mediaResponse.IsSuccess) {
          player.Image = mediaResponse.Value
        }
      }

      const request = {
        params: {
          name: player.Name,
          number: player.Number,
          position: player.Position,
          team: player.Team,
          birthday: player.Birthday,
          height: player.Height,
          weight: player.Weight,
          avatarUrl: player.Image,
        },
      }

      await api.value
        .post(`${playerApiPath}Add`, request)
        .then((response) => {
          console.log(response)

          resolve(new ResponseModel({ Value: [] }))
        })
        .catch((error) => {
          console.log(error)
          resolve(new ResponseModel({ IsSuccess: false }))
        })
    })

  /**
   * * Запрос на получение позиций игроков
   * @returns Позиции игроков
   */
  const getPositions = async () =>
    new Promise<ResponseModel<string[]>>(async (resolve) => {
      await api.value
        .get(`${playerApiPath}GetPositions`)
        .then((response) => {
          positions.value = response.data

          resolve(new ResponseModel({ Value: positions.value }))
        })
        .catch((error) => {
          console.log(error)
          resolve(new ResponseModel({ IsSuccess: false }))
        })
    })

  /**
   * * Запрос на получение ученика
   * @param id Id ученика
   * @returns Данные об ученике
   */
  const getPlayer = async (id: number) =>
    new Promise<ResponseModel<PlayerModel>>(async (resolve) => {
      await api.value
        .get(`${playerApiPath}Get`, { params: { id } })
        .then((response) => {
          resolve(new ResponseModel({ Value: mapPlayer(response.data) }))
        })
        .catch((error) => {
          console.log(error)
          resolve(new ResponseModel({ IsSuccess: false }))
        })
    })

  /**
   * * Приведение к модели игрока из запроса
   */
  const mapPlayer = (response: any) => {
    return new PlayerModel({
      Id: response.id,
      Name: response.name,
      Number: response.number,
      Position: response.position,
      Team: response.team,
      Birthday: response.birthday,
      Height: response.height,
      Weight: response.weight,
      Image: response.avatarUrl ? apiUrl.value + response.avatarUrl : '',
    })
  }

  return {
    /**
     * * Отправка запроса для получения списка игроков
     * @param filter Данные для запроса
     * @returns Список игроков
     */
    getPlayers,
    /**
     * * Запрос на добавление нового игрока
     * @param player Данные об игроке
     * @returns Новый игрок
     */
    add,
    /**
     * * Запрос на получение позиций игроков
     * @returns Позиции игроков
     */
    getPositions,
    /**
     * * Запрос на получение ученика
     * @param id Id ученика
     * @returns Данные об ученике
     */
    getPlayer,
    /**
     * * Список игроков
     */
    players,
    /**
     * * Позиции игроков
     */
    positions,
    /**
     * * Список позиций для select компонента
     */
    optionsPosition,
  }
})

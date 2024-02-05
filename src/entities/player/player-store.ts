import { defineStore, storeToRefs } from 'pinia'
import {
  PlayerModel,
  FilterModel,
  ResponseModel,
  useApiStore,
  useMediaStore,
  PaginationModel,
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
   * * Позиции игроков
   */
  const positions = ref<string[]>([])
  /**
   * * Данные для пагинации игроков
   */
  const pagination = ref(new PaginationModel())

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
          pagination.value = new PaginationModel({
            Count: response?.data?.count,
            Page: response?.data?.page,
            PageSize: response?.data?.size,
          })

          resolve(
            new ResponseModel({
              Value: response?.data?.data?.map((x: any) => mapPlayer(x)) || [],
            })
          )
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
  const updatePlayer = async (player: PlayerModel) =>
    new Promise<ResponseModel<PlayerModel[]>>(async (resolve) => {
      if (player.Image instanceof File) {
        const mediaResponse = await saveImage(player.Image)
        if (mediaResponse.IsSuccess) {
          player.Image = mediaResponse.Value
        } else {
          return resolve(null)
        }
      }

      const request = {
        id: player.Id,
        name: player.Name,
        number: player.Number,
        position: player.Position,
        team: player.Team,
        birthday: player.Birthday,
        height: player.Height,
        weight: player.Weight,
        avatarUrl: player.Image,
      }

      const query = player.Id
        ? api.value.put(`${playerApiPath}Update`, request)
        : api.value.post(`${playerApiPath}Add`, request)

      await query
        .then((response) => {
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
   * * Запрос на удаление игрока
   * @param id Id удаляемого игрока
   */
  const deletePlayer = async (id: number) =>
    new Promise<ResponseModel<boolean>>(async (resolve) => {
      await api.value
        .delete(`${playerApiPath}Delete`, { params: { id } })
        .then(() => {
          resolve(new ResponseModel({ Value: true }))
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
      Birthday: new Date(response.birthday),
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
     * * Запрос на добавление/редактирование игрока
     * @param player Данные об игроке
     * @returns Новый игрок
     */
    updatePlayer,
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
     * * Запрос на удаление игрока
     * @param id Id удаляемого игрока
     */
    deletePlayer,
    /**
     * * Позиции игроков
     */
    positions,
    /**
     * * Список позиций для select компонента
     */
    optionsPosition,
    /**
     * * Данные для пагинации игроков
     */
    pagination,
  }
})

import PopoverCustom from '@/component/PopoverCustom';
import { CheckIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex } from '@chakra-ui/react';
import classNames from 'classnames';
import './style.scss';
type Props = {}

type ItemType = {
  id: number;
  position: number;
  name: string,
  detail: string
}
type DataType = {
  id: number; name: string; position: number, detail: string
}
const Items = (props: ItemType) => {
  const { id, position, name, detail } = props

  return (
    <PopoverCustom preferredPosition="bottom-center" content={
      <div className="custom-content">
        {detail}
        <Button className="custom-button">Bắt đầu</Button>
      </div>
    }>
      <div className={classNames("learn-step")}
        data-left={position}
        data-text={name}
      >
        <CheckIcon w={6} h={6} color="#f89200" />
      </div >
    </PopoverCustom>
  )
}
const Learn = (props: Props) => {

  const fakeData = [{
    id: 'a',
    name: 'Level 1',
    description: 'Gọi đồ uống, chào hỏi',
    data: [
      {
        id: 1,
        name: 'Gọi đồ uống',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      },
      {
        id: 2,
        name: 'Chào hỏi',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      },
      {
        id: 3,
        name: 'Gọi đồ uống 2',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      },
      {
        id: 4,
        name: 'Chào hỏi 2',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      },
      {
        id: 5,
        name: 'Gọi đồ uống 3',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      },
      {
        id: 6,
        name: 'Gọi đồ uống 3',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      },
      {
        id: 7,
        name: 'Gọi đồ uống 3',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      },
      {
        id: 8,
        name: 'Gọi đồ uống 3',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      },
      {
        id: 9,
        name: 'Gọi đồ uống 3',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      },
      {
        id: 10,
        name: 'Gọi đồ uống 3',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      },
      {
        id: 11,
        name: 'Gọi đồ uống 3',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      },
      {
        id: 12,
        name: 'Gọi đồ uống 3',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      },
      {
        id: 13,
        name: 'Gọi đồ uống 3',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      }
    ]
  },
  {
    id: 'b',
    name: 'Level 2',
    description: 'Gọi đồ uống, chào hỏi',
    data: [
      {
        id: 6,
        name: 'Gọi đồ uống',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      },
      {
        id: 7,
        name: 'Chào hỏi',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      },
      {
        id: 8,
        name: 'Gọi đồ uống 2',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      },
      {
        id: 9,
        name: 'Chào hỏi 2',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      },
      {
        id: 10,
        name: 'Gọi đồ uống 3',
        detail: 'Đồ uống ngon thì cần có bạn hiền'
      }
    ]
  }
  ]

  const revertData = () => {
    let dataRevert = {
      index: 0,
      mode: 'minus'
    }

    return fakeData.map(x => {
      let listArr: DataType[] = []
      x?.data.forEach(item => {
        listArr.push({
          ...item, position: dataRevert.index
        })
        if (dataRevert?.mode === 'minus') {
          if (dataRevert?.index === -1) {
            dataRevert.mode = 'add'
          }
          dataRevert.index = dataRevert.index - 1
        }
        else {
          if (dataRevert?.index === 1) {
            dataRevert.mode = 'minus'
          }
          dataRevert.index = dataRevert.index + 1
        }


      })
      return { ...x, data: listArr }
    })
  }

  return (
    <Flex w='100%' justifyContent='space-between'>
      <Center w='100%' display='flex' flexDirection='column'>
        {revertData().map(x =>
          <div key={x?.id} className="wrapper">
            <Box bg='#ffc800' w='50%' p={6} borderWidth='1px' borderRadius='lg'>
              <div className="title">
                <span className="level">{x?.name}</span>
                <span>{x?.description}</span>
              </div>
            </Box>
            <div className="learn-container">
              {x?.data.map(item =>
                <Items key={item?.id} id={item?.id} position={item?.position} name={item?.name} detail={item?.detail} />
              )}

            </div>
          </div>
        )}
      </Center>
      <Center w='50%'>
        <Box position="sticky">
          123123
        </Box>
      </Center>
    </Flex>

  )
}

export default Learn